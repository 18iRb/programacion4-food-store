from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.modules.productos.models import Producto

from sqlmodel import Field, Relationship, SQLModel


class CategoriaBase(SQLModel):
    nombre: str = Field(
        ...,
        unique=True,
    )

    descripcion: str | None = None


class Categoria(
    CategoriaBase,
    table=True,
):
    __tablename__ = "categorias"

    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    activo: bool = True

    productos: list["Producto"] = Relationship(back_populates="categoria")
