from sqlmodel import Field, SQLModel


class CategoriaBase(SQLModel):
    nombre: str = Field(
        ...,
        unique=True,
    )

    descripcion: str


class Categoria(
    CategoriaBase,
    table=True,
):
    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    activo: bool = True
