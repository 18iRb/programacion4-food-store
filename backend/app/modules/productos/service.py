from app.core.exceptions import CategoriaNoEncontrada, ProductoNoEncontrado
from app.modules.productos.models import Producto
from app.modules.productos.schemas import (
    ProductoCreate,
    ProductoRead,
    ProductosPaginados,
    ProductoStockUpdate,
    ProductoUpdate,
)
from app.modules.productos.unit_of_work import ProductoUnitOfWork


class ProductoService:
    def __init__(
        self,
        uow: ProductoUnitOfWork,
    ):
        self.uow = uow

    def _get_product_by_id(
        self,
        uow: ProductoUnitOfWork,
        producto_id: int,
    ) -> Producto:

        producto = uow.productos.get_by_id(record_id=producto_id)

        if producto is None or not producto.activo:
            raise ProductoNoEncontrado(
                f"El producto con ID {producto_id} no existe o se encuentra desactivado.",
            )

        return producto

    def _validate_category_exists_and_active(
        self,
        uow: ProductoUnitOfWork,
        categoria_id: int,
    ) -> None:

        categoria = uow.categorias.get_by_id(record_id=categoria_id)

        if categoria is None or not categoria.activo:
            raise CategoriaNoEncontrada(
                f"La categoría con ID {categoria_id} no existe o se encuentra desactivada.",
            )

    def get_products(
        self,
        skip: int = 0,
        limit: int = 20,
        nombre: str | None = None,
        categoria_id: int | None = None,
        disponible: bool | None = None,
    ) -> ProductosPaginados:

        with self.uow as uow:
            productos = uow.productos.search(
                skip=skip,
                limit=limit,
                nombre=nombre,
                categoria_id=categoria_id,
                disponible=disponible,
            )

            total = uow.productos.count_active(
                nombre=nombre,
                categoria_id=categoria_id,
                disponible=disponible,
            )

            return ProductosPaginados(
                total=total,
                items=[ProductoRead.model_validate(producto) for producto in productos],
            )

    def get_product_by_id(
        self,
        producto_id: int,
    ) -> ProductoRead:

        with self.uow as uow:
            producto = self._get_product_by_id(
                uow=uow,
                producto_id=producto_id,
            )

            return ProductoRead.model_validate(
                producto,
            )

    def create_product(
        self,
        schema: ProductoCreate,
    ) -> ProductoRead:

        with self.uow as uow:
            self._validate_category_exists_and_active(
                uow=uow,
                categoria_id=schema.categoria_id,
            )

            producto = Producto(**schema.model_dump())

            uow.productos.add(producto)

            return ProductoRead.model_validate(
                producto,
            )

    def update_product_by_id(
        self,
        producto_id: int,
        schema: ProductoUpdate,
    ) -> ProductoRead:

        with self.uow as uow:
            producto = self._get_product_by_id(
                uow=uow,
                producto_id=producto_id,
            )

            update_data = schema.model_dump(
                exclude_unset=True,
            )

            if "categoria_id" in update_data:
                self._validate_category_exists_and_active(
                    uow=uow,
                    categoria_id=update_data["categoria_id"],
                )

            for field, value in update_data.items():
                setattr(
                    producto,
                    field,
                    value,
                )

            return ProductoRead.model_validate(
                producto,
            )

    def update_stock(
        self,
        producto_id: int,
        schema: ProductoStockUpdate,
    ) -> ProductoRead:

        with self.uow as uow:
            producto = self._get_product_by_id(
                uow=uow,
                producto_id=producto_id,
            )

            producto.stock = schema.stock
            producto.disponible = schema.disponible

            return ProductoRead.model_validate(
                producto,
            )

    def delete_product_by_id(
        self,
        producto_id: int,
    ) -> None:

        with self.uow as uow:
            producto = self._get_product_by_id(
                uow=uow,
                producto_id=producto_id,
            )

            producto.activo = False
