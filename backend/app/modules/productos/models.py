from sqlmodel import Field, SQLModel


class ProductoBase(SQLModel):
    nombre: str

    descripcion: str | None = None

    precio_base: float

    imagen_url: str | None = None


class Producto(
    ProductoBase,
    table=True,
):
    __tablename__ = "productos"

    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    categoria_id: int = Field(
        foreign_key="categorias.id",
    )

    stock: int = 0

    disponible: bool = True

    activo: bool = True