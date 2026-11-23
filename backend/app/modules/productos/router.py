from typing import Annotated

from fastapi import APIRouter, Depends, Path, Query, status

from app.core.deps import AdminRequireRole
from app.modules.productos.schemas import (
    ProductoCreate,
    ProductoRead,
    ProductosPaginados,
    ProductoStockUpdate,
    ProductoUpdate,
)
from app.modules.productos.service import ProductoService
from app.modules.productos.unit_of_work import ProductoUnitOfWork

router = APIRouter(
    prefix="/productos",
    tags=["productos"],
)


def get_product_service() -> ProductoService:
    uow = ProductoUnitOfWork()

    return ProductoService(uow=uow)


ProductServiceDep = Annotated[
    ProductoService,
    Depends(get_product_service),
]


@router.get(
    path="/",
    response_model=ProductosPaginados,
    status_code=status.HTTP_200_OK,
)
def get_products(
    service: ProductServiceDep,
    skip: int = Query(
        default=0,
        ge=0,
    ),
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
    ),
    search: str | None = Query(
        default=None,
    ),
    category_id: int | None = Query(
        default=None,
        ge=1,
    ),
    disponible: bool | None = None,
) -> ProductosPaginados:

    return service.get_products(
        skip=skip,
        limit=limit,
        search=search,
        categoria_id=category_id,
        disponible=disponible,
    )


@router.get(
    path="/{product_id}",
    response_model=ProductoRead,
    status_code=status.HTTP_200_OK,
)
def get_product(
    service: ProductServiceDep,
    product_id: int = Path(
        ge=1,
    ),
) -> ProductoRead:

    return service.get_product_by_id(
        producto_id=product_id,
    )


@router.post(
    path="/",
    response_model=ProductoRead,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    _: AdminRequireRole,
    service: ProductServiceDep,
    schema: ProductoCreate,
) -> ProductoRead:

    return service.create_product(
        schema=schema,
    )


@router.put(
    path="/{product_id}",
    response_model=ProductoRead,
    status_code=status.HTTP_200_OK,
)
def update_product(
    _: AdminRequireRole,
    service: ProductServiceDep,
    schema: ProductoUpdate,
    product_id: int = Path(
        ge=1,
    ),
) -> ProductoRead:

    return service.update_product_by_id(
        producto_id=product_id,
        schema=schema,
    )


@router.patch(
    path="/{product_id}/stock",
    response_model=ProductoRead,
    status_code=status.HTTP_200_OK,
)
def update_stock(
    _: AdminRequireRole,
    service: ProductServiceDep,
    schema: ProductoStockUpdate,
    product_id: int = Path(
        ge=1,
    ),
) -> ProductoRead:

    return service.update_stock(
        producto_id=product_id,
        schema=schema,
    )


@router.delete(
    path="/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    _: AdminRequireRole,
    service: ProductServiceDep,
    product_id: int = Path(
        ge=1,
    ),
) -> None:

    return service.delete_product_by_id(
        producto_id=product_id,
    )
