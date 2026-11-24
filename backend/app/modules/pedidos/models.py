from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.modules.productos.models import Producto
    from app.modules.usuarios.models import User

from datetime import UTC, datetime

from sqlmodel import Field, Relationship, SQLModel

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

    usuario: "User" = Relationship(back_populates="pedidos")

    items: list["DetallePedido"] = Relationship(back_populates="pedido")


class DetallePedido(
    SQLModel,
    table=True,
):
    __tablename__ = "detalle_pedidos"

    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    pedido_id: int | None = Field(
        default=None,
        foreign_key="pedidos.id",
    )

    producto_id: int = Field(foreign_key="productos.id")

    cantidad: int

    nombre_producto: str

    precio_unitario: float

    subtotal: float

    pedido: "Pedido" = Relationship(back_populates="items")

    producto: "Producto" = Relationship(back_populates="detalles")
