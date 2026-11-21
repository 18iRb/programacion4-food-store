from sqlmodel import Field, SQLModel


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
