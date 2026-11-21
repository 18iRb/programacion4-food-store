from datetime import datetime

from pydantic import ConfigDict
from sqlmodel import Field

from app.modules.usuarios.models import UserBase


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserPublic(UserBase):
    id: int

    role: str

    disabled: bool

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
