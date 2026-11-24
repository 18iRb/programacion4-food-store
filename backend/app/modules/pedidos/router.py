from typing import Annotated

from fastapi import APIRouter, Depends, Path, Query, status

from app.core.deps import AdminRequireRole, CurrentActiveUserDep
from app.modules.pedidos.enums import EstadoPedido
from app.modules.pedidos.schemas import (
    CambioEstado,
    PedidoCreate,
    PedidoRead,
    PedidosPaginados,
    ResumenPedidos,
)
from app.modules.pedidos.service import PedidoService
from app.modules.pedidos.unit_of_work import PedidoUnitOfWork

router = APIRouter(
    prefix="/pedidos",
    tags=["pedidos"],
)


def get_pedido_service() -> PedidoService:
    uow = PedidoUnitOfWork()

    return PedidoService(uow=uow)


PedidoServiceDep = Annotated[
    PedidoService,
    Depends(get_pedido_service),
]


@router.post(
    path="/",
    response_model=PedidoRead,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    current_user: CurrentActiveUserDep,
    service: PedidoServiceDep,
    schema: PedidoCreate,
) -> PedidoRead:

    return service.create_order(
        current_user=current_user,
        schema=schema,
    )


@router.get(
    path="/",
    response_model=PedidosPaginados,
    status_code=status.HTTP_200_OK,
)
def get_orders(
    current_user: CurrentActiveUserDep,
    service: PedidoServiceDep,
    skip: int = Query(
        default=0,
        ge=0,
    ),
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
    ),
    estado: EstadoPedido | None = None,
) -> PedidosPaginados:

    return service.get_orders(
        current_user=current_user,
        skip=skip,
        limit=limit,
        estado=estado,
    )


@router.get(
    path="/resumen",
    response_model=ResumenPedidos,
    status_code=status.HTTP_200_OK,
)
def get_summary(
    _: AdminRequireRole,
    service: PedidoServiceDep,
) -> ResumenPedidos:

    return service.get_summary()


@router.get(
    path="/{pedido_id}",
    response_model=PedidoRead,
    status_code=status.HTTP_200_OK,
)
def get_order(
    current_user: CurrentActiveUserDep,
    service: PedidoServiceDep,
    pedido_id: int = Path(
        ge=1,
    ),
) -> PedidoRead:

    return service.get_order_by_id(
        pedido_id=pedido_id,
        current_user=current_user,
    )


@router.patch(
    path="/{pedido_id}/estado",
    response_model=PedidoRead,
    status_code=status.HTTP_200_OK,
)
def change_status(
    _: AdminRequireRole,
    service: PedidoServiceDep,
    schema: CambioEstado,
    pedido_id: int = Path(
        ge=1,
    ),
) -> PedidoRead:

    return service.change_status(
        pedido_id=pedido_id,
        schema=schema,
    )


@router.patch(
    path="/{pedido_id}/cancelar",
    response_model=PedidoRead,
    status_code=status.HTTP_200_OK,
)
def cancel_order(
    current_user: CurrentActiveUserDep,
    service: PedidoServiceDep,
    pedido_id: int = Path(
        ge=1,
    ),
) -> PedidoRead:

    return service.cancel_order(
        pedido_id=pedido_id,
        current_user=current_user,
    )
