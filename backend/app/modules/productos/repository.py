from sqlmodel import select

from app.core.base_repository import BaseRepository
from app.modules.productos.models import Producto


class ProductoRepository(BaseRepository[Producto]):
    def __init__(self, session):
        super().__init__(
            session,
            Producto,
        )

    def search(
        self,
        skip: int = 0,
        limit: int = 20,
        nombre: str | None = None,
        categoria_id: int | None = None,
        disponible: bool | None = None,
    ) -> list[Producto]:
        statement = select(Producto).where(
            Producto.activo.is_(True),
        )

        if nombre:
            statement = statement.where(Producto.nombre.ilike(f"%{nombre}%"))

        if categoria_id:
            statement = statement.where(
                Producto.categoria_id == categoria_id,
            )

        if disponible is not None:
            statement = statement.where(
                Producto.disponible.is_(disponible),
            )

        statement = statement.offset(skip).limit(limit)

        return self.session.exec(statement).all()
