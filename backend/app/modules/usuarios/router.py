from typing import Annotated

from fastapi import APIRouter, Depends, Path, Query, status

from app.core.deps import CurrentActiveUserDep, require_role
from app.modules.usuarios.schemas import UserPublic
from app.modules.usuarios.service import UserService
from app.modules.usuarios.unit_of_work import UserUnitOfWork

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[
        Depends(
            require_role(["admin"]),
        )
    ],
)


def get_user_service() -> UserService:
    uow = UserUnitOfWork()

    return UserService(uow=uow)


UserServiceDep = Annotated[
    UserService,
    Depends(get_user_service),
]


@router.get(
    "/usuarios",
    response_model=list[UserPublic],
    status_code=status.HTTP_200_OK,
)
def get_users(
    service: UserServiceDep,
    skip: int = Query(
        default=0,
        ge=0,
    ),
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
    ),
) -> list[UserPublic]:

    return service.get_users(
        skip=skip,
        limit=limit,
    )


@router.post(
    "/usuarios/{user_id}/activar",
    response_model=UserPublic,
    status_code=status.HTTP_200_OK,
)
def activate_user(
    service: UserServiceDep,
    user_id: int = Path(
        ge=1,
    ),
) -> UserPublic:

    return service.activate_user(
        user_id=user_id,
    )


@router.post(
    "/usuarios/{user_id}/desactivar",
    response_model=UserPublic,
    status_code=status.HTTP_200_OK,
)
def deactivate_user(
    service: UserServiceDep,
    current_user: CurrentActiveUserDep,
    user_id: int = Path(
        ge=1,
    ),
) -> UserPublic:

    return service.deactivate_user(
        user_id=user_id,
        current_user=current_user,
    )
