from app.core.exceptions import (
    OperacionNoPermitida,
    PedidoAjeno,
    PedidoNoEncontrado,
    ProductoNoDisponible,
    ProductoNoEncontrado,
    ProductoRepetido,
    StockInsuficiente,
    TransicionInvalida,
)
from app.modules.pedidos.enums import EstadoPedido
from app.modules.pedidos.models import DetallePedido, Pedido
from app.modules.pedidos.schemas import (
    CambioEstado,
    ItemPedidoCreate,
    PedidoCreate,
    PedidoRead,
    PedidosPaginados,
    ResumenPedidos,
)
from app.modules.pedidos.unit_of_work import PedidoUnitOfWork
from app.modules.productos.models import Producto
from app.modules.usuarios.models import User


class PedidoService:
    def __init__(
        self,
        uow: PedidoUnitOfWork,
    ):
        self.uow = uow

    def _validate_no_duplicate_products(
        self,
        items: list[ItemPedidoCreate],
    ) -> None:

        productos_vistos = set()

        for item in items:
            if item.producto_id in productos_vistos:
                raise ProductoRepetido(
                    f"El producto con ID {item.producto_id} se encuentra repetido en el pedido.",
                )

            productos_vistos.add(
                item.producto_id,
            )

    def _get_products(
        self,
        uow: PedidoUnitOfWork,
        items: list[ItemPedidoCreate],
    ) -> dict[int, Producto]:

        productos = {}

        for item in items:
            producto = uow.productos.get_by_id(
                record_id=item.producto_id,
            )

            if producto is None:
                raise ProductoNoEncontrado(
                    f"El producto con ID {item.producto_id} no existe.",
                )

            productos[producto.id] = producto

        return productos

    def _validate_products_available(
        self,
        productos: dict[int, Producto],
    ) -> None:

        for producto in productos.values():
            if not producto.disponible:
                raise ProductoNoDisponible(
                    f"El producto con ID {producto.id} no está disponible.",
                )

    def _validate_stock(
        self,
        items: list[ItemPedidoCreate],
        productos: dict[int, Producto],
    ) -> None:

        for item in items:
            producto = productos[item.producto_id]

            if item.cantidad > producto.stock:
                raise StockInsuficiente(
                    f"Stock insuficiente para '{producto.nombre}'. "
                    f"Disponible: {producto.stock}. "
                    f"Solicitado: {item.cantidad}.",
                )

    def _build_order_details(
        self,
        items: list[ItemPedidoCreate],
        productos: dict[int, Producto],
    ) -> tuple[list[DetallePedido], float]:

        total = 0
        detalles = []

        for item in items:
            producto = productos[item.producto_id]

            subtotal = producto.precio_base * item.cantidad

            total += subtotal

            detalles.append(
                DetallePedido(
                    producto_id=producto.id,
                    cantidad=item.cantidad,
                    nombre_producto=producto.nombre,
                    precio_unitario=producto.precio_base,
                    subtotal=subtotal,
                )
            )

        return detalles, total

    def _discount_stock(
        self,
        items: list[ItemPedidoCreate],
        productos: dict[int, Producto],
    ) -> None:

        for item in items:
            producto = productos[item.producto_id]

            producto.stock -= item.cantidad

            if producto.stock == 0:
                producto.disponible = False

    def _restore_stock(
        self,
        pedido: Pedido,
    ) -> None:

        for detalle in pedido.items:
            producto = detalle.producto

            producto.stock += detalle.cantidad

            producto.disponible = True

    def _validate_transition(
        self,
        estado_actual: EstadoPedido,
        nuevo_estado: EstadoPedido,
    ) -> None:

        allowed_transitions = {
            EstadoPedido.PENDIENTE: [
                EstadoPedido.EN_PREPARACION,
                EstadoPedido.CANCELADO,
            ],
            EstadoPedido.EN_PREPARACION: [
                EstadoPedido.ENTREGADO,
                EstadoPedido.CANCELADO,
            ],
        }

        if nuevo_estado not in allowed_transitions.get(
            estado_actual,
            [],
        ):
            raise TransicionInvalida(
                f"No se puede pasar de {estado_actual.value} a {nuevo_estado.value}.",
            )

    def create_order(
        self,
        current_user: User,
        schema: PedidoCreate,
    ) -> PedidoRead:

        with self.uow as uow:
            self._validate_no_duplicate_products(
                schema.items,
            )

            productos = self._get_products(
                uow,
                schema.items,
            )

            self._validate_products_available(
                productos,
            )

            self._validate_stock(
                schema.items,
                productos,
            )

            detalles, total = self._build_order_details(
                schema.items,
                productos,
            )

            self._discount_stock(
                schema.items,
                productos,
            )

            pedido = Pedido(
                usuario_id=current_user.id,
                forma_pago=schema.forma_pago,
                direccion_entrega=schema.direccion_entrega,
                notas=schema.notas,
                total=total,
                items=detalles,
            )

            pedido = uow.pedidos.add(
                pedido,
            )

            return PedidoRead.model_validate(
                pedido,
            )

    def get_orders(
        self,
        current_user: User,
        skip: int = 0,
        limit: int = 20,
        estado: EstadoPedido | None = None,
    ) -> PedidosPaginados:

        with self.uow as uow:
            if current_user.role == "admin":
                pedidos = uow.pedidos.list_filtered(
                    skip=skip,
                    limit=limit,
                    estado=estado,
                )

            else:
                pedidos = uow.pedidos.list_filtered(
                    usuario_id=current_user.id,
                    skip=skip,
                    limit=limit,
                    estado=estado,
                )

            return PedidosPaginados(
                total=len(pedidos),
                items=[
                    PedidoRead.model_validate(
                        pedido,
                    )
                    for pedido in pedidos
                ],
            )

    def get_my_orders(
        self,
        current_user: User,
    ) -> PedidosPaginados:

        with self.uow as uow:
            pedidos = uow.pedidos.list_by_usuario(
                current_user.id,
            )

            return PedidosPaginados(
                total=len(pedidos),
                items=[
                    PedidoRead.model_validate(
                        pedido,
                    )
                    for pedido in pedidos
                ],
            )

    def get_summary(
        self,
    ) -> ResumenPedidos:

        with self.uow as uow:
            pendientes = uow.pedidos.count_by_estado(
                EstadoPedido.PENDIENTE,
            )

            en_preparacion = uow.pedidos.count_by_estado(
                EstadoPedido.EN_PREPARACION,
            )

            entregados = uow.pedidos.count_by_estado(
                EstadoPedido.ENTREGADO,
            )

            cancelados = uow.pedidos.count_by_estado(
                EstadoPedido.CANCELADO,
            )

            pedidos_hoy = uow.pedidos.count_today()

            ingresos_entregados = uow.pedidos.total_delivered_revenue()

            return ResumenPedidos(
                pendientes=pendientes,
                en_preparacion=en_preparacion,
                entregados=entregados,
                cancelados=cancelados,
                pedidos_hoy=pedidos_hoy,
                ingresos_entregados=ingresos_entregados,
            )

    def get_order_by_id(
        self,
        pedido_id: int,
        current_user: User,
    ) -> PedidoRead:

        with self.uow as uow:
            pedido = uow.pedidos.get_by_id(
                record_id=pedido_id,
            )

            if pedido is None:
                raise PedidoNoEncontrado(
                    f"Pedido {pedido_id} no encontrado.",
                )

            if current_user.role != "admin" and pedido.usuario_id != current_user.id:
                raise PedidoAjeno(
                    "No tiene permisos para ver este pedido.",
                )

            return PedidoRead.model_validate(
                pedido,
            )

    def change_status(
        self,
        pedido_id: int,
        schema: CambioEstado,
    ) -> PedidoRead:

        with self.uow as uow:
            pedido = uow.pedidos.get_by_id(
                pedido_id,
            )

            if pedido is None:
                raise PedidoNoEncontrado(
                    f"Pedido {pedido_id} no encontrado.",
                )

            self._validate_transition(
                pedido.estado,
                schema.estado,
            )

            if schema.estado == EstadoPedido.CANCELADO:
                self._restore_stock(
                    pedido,
                )

            pedido.estado = schema.estado

            return PedidoRead.model_validate(
                pedido,
            )

    def cancel_order(
        self,
        pedido_id: int,
        current_user: User,
    ) -> PedidoRead:

        with self.uow as uow:
            pedido = uow.pedidos.get_by_id(
                record_id=pedido_id,
            )

            if pedido is None:
                raise PedidoNoEncontrado(
                    f"Pedido {pedido_id} no encontrado.",
                )

            if pedido.usuario_id != current_user.id:
                raise PedidoAjeno(
                    "No tiene permisos para cancelar este pedido.",
                )

            if pedido.estado != EstadoPedido.PENDIENTE:
                raise OperacionNoPermitida(
                    "Sólo pueden cancelarse pedidos en estado PENDIENTE.",
                )

            self._restore_stock(
                pedido,
            )

            pedido.estado = EstadoPedido.CANCELADO

            return PedidoRead.model_validate(
                pedido,
            )
