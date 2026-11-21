from pydantic import ConfigDict
from sqlmodel import Field, SQLModel

from app.modules.categorias.models import CategoriaBase


class CategoriaCreate(SQLModel):
    nombre: str = Field(
        min_length=2,
        max_length=100,
    )

    descripcion: str


class CategoriaUpdate(SQLModel):
    nombre: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    descripcion: str | None = None


class CategoriaRead(CategoriaBase):
    id: int
    activo: bool

    model_config = ConfigDict(
        from_attributes=True,
    )
