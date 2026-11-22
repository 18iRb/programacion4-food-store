from datetime import UTC, datetime

from sqlmodel import Field, SQLModel

from app.modules.pedidos.enums import EstadoPedido, FormaPago


class Pedido(
    SQLModel,
    table=True,
):
    __tablename__ = "pedidos"

    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    usuario_id: int = Field(
        foreign_key="usuarios.id",
    )

    estado: EstadoPedido = EstadoPedido.PENDIENTE

    forma_pago: FormaPago

    direccion_entrega: str

    notas: str | None = None

    total: float

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
    )

    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
    )


class DetallePedido(
    SQLModel,
    table=True,
):
    __tablename__ = "detalle_pedidos"

    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    pedido_id: int = Field(foreign_key="pedidos.id")

    producto_id: int = Field(foreign_key="productos.id")

    cantidad: int

    nombre_producto: str

    precio_unitario: float

    subtotal: float
