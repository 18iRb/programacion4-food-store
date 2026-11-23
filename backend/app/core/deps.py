from collections.abc import Callable
from typing import Annotated

from fastapi import Depends, HTTPException, status
from sqlmodel import Session

from app.core.database import get_session
from app.core.security import (
    decode_access_token,
    oauth2_scheme,
)
from app.modules.usuarios.models import User
from app.modules.usuarios.repository import UserRepository

SessionDep = Annotated[
    Session,
    Depends(get_session),
]


async def get_current_user(
    token: Annotated[
        str,
        Depends(oauth2_scheme),
    ],
    session: SessionDep,
) -> User:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales inválidas o token expirado.",
        headers={
            "WWW-Authenticate": "Bearer",
        },
    )

    payload = decode_access_token(
        token,
    )

    if payload is None:
        raise credentials_exception

    email = payload.get(
        "sub",
    )

    if email is None:
        raise credentials_exception

    user_repo = UserRepository(
        session,
    )

    user = user_repo.get_by_email(
        email=email,
    )

    if user is None:
        raise credentials_exception

    return user


async def get_current_active_user(
    current_user: Annotated[
        User,
        Depends(get_current_user),
    ],
) -> User:

    if current_user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La cuenta se encuentra desactivada.",
        )

    return current_user


CurrentUserDep = Annotated[
    User,
    Depends(get_current_user),
]

CurrentActiveUserDep = Annotated[
    User,
    Depends(get_current_active_user),
]


def require_role(
    allowed_roles: list[str],
) -> Callable:

    async def role_checker(
        current_user: CurrentActiveUserDep,
    ) -> User:

        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos suficientes.",
            )

        return current_user

    return role_checker

AdminRequireRole = Annotated[
    User,
    Depends(
        require_role(allowed_roles=["admin"]),
    ),
]
