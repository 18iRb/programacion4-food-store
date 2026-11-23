from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.config import settings
from app.core.deps import CurrentActiveUserDep
from app.core.security import create_access_token
from app.modules.auth.schemas import MessageResponse
from app.modules.auth.service import AuthService
from app.modules.usuarios.schemas import UserCreate, UserPublic
from app.modules.usuarios.unit_of_work import UserUnitOfWork

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


def get_auth_service() -> AuthService:
    uow = UserUnitOfWork()

    return AuthService(uow=uow)


AuthServiceDep = Annotated[
    AuthService,
    Depends(get_auth_service),
]


@router.post(
    path="/register",
    response_model=UserPublic,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    service: AuthServiceDep,
    schema: UserCreate,
) -> UserPublic:

    return service.register(schema=schema)


@router.post(
    path="/token",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
)
def login_user(
    service: AuthServiceDep,
    form_data: Annotated[
        OAuth2PasswordRequestForm,
        Depends(),
    ],
    response: Response,
) -> MessageResponse:

    user = service.authenticate(
        email=form_data.username,
        password=form_data.password,
    )

    token = create_access_token(
        data={
            "sub": user.email,
            "role": user.role,
        }
    )

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=False,  # en producción, con HTTPS: True
    )

    return {"message": "Login exitoso. Sesión iniciada."}


@router.get(
    path="/me",
    response_model=UserPublic,
    status_code=status.HTTP_200_OK,
)
def me(
    current_user: CurrentActiveUserDep,
    service: AuthServiceDep,
) -> UserPublic:

    return service.get_me(
        current_user=current_user,
    )


@router.post(
    path="/logout",
    response_model=MessageResponse,
    status_code=status.HTTP_200_OK,
)
def logout(
    response: Response,
) -> None:
    response.delete_cookie(
        key="access_token",
    )

    return MessageResponse(
        message="Logout exitoso",
    )
