from typing import Annotated

from fastapi import APIRouter, Depends, Path, status

from app.core.deps import AdminRequireRole
from app.modules.categorias.schemas import (
    CategoriaCreate,
    CategoriaRead,
    CategoriaUpdate,
)
from app.modules.categorias.service import CategoriaService
from app.modules.categorias.unit_of_work import CategoriaUnitOfWork

router = APIRouter(
    prefix="/categorias",
    tags=["categorias"],
)


def get_category_service() -> CategoriaService:
    uow = CategoriaUnitOfWork()

    return CategoriaService(uow=uow)


CategoryServiceDep = Annotated[CategoriaService, Depends(get_category_service)]


@router.get(
    path="/",
    response_model=list[CategoriaRead],
    status_code=status.HTTP_200_OK,
)
def get_categories(
    service: CategoryServiceDep,
) -> list[CategoriaRead]:

    return service.get_categories()


@router.get(
    path="/{category_id}",
    response_model=CategoriaRead,
    status_code=status.HTTP_200_OK,
)
def get_category_by_id(
    service: CategoryServiceDep,
    category_id: int = Path(
        ge=1,
    ),
) -> CategoriaRead:

    return service.get_category_by_id(
        categoria_id=category_id,
    )


@router.post(
    path="/",
    response_model=CategoriaRead,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    _: AdminRequireRole,
    service: CategoryServiceDep,
    schema: CategoriaCreate,
) -> CategoriaRead:

    return service.create_category(
        schema=schema,
    )


@router.put(
    path="/{category_id}",
    response_model=CategoriaRead,
    status_code=status.HTTP_200_OK,
)
def update_category(
    _: AdminRequireRole,
    service: CategoryServiceDep,
    schema: CategoriaUpdate,
    category_id: int = Path(
        ge=1,
    ),
) -> CategoriaRead:

    return service.update_category_by_id(
        categoria_id=category_id,
        schema=schema,
    )


@router.delete(
    path="/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_category(
    _: AdminRequireRole,
    service: CategoryServiceDep,
    category_id: int = Path(
        ge=1,
    ),
) -> None:

    return service.delete_category_by_id(
        categoria_id=category_id,
    )
