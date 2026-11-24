from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.modules.pedidos.models import Pedido

from datetime import UTC, datetime

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    username: str = Field(
        ...,
        unique=True,
    )

    full_name: str

    email: EmailStr = Field(
        ...,
        unique=True,
    )


class User(
    UserBase,
    table=True,
):
    __tablename__ = "usuarios"

    id: int | None = Field(
        default=None,
        primary_key=True,
    )

    hashed_password: str

    role: str = "user"

    disabled: bool = False

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
    )

    pedidos: list["Pedido"] = Relationship(back_populates="usuario")
