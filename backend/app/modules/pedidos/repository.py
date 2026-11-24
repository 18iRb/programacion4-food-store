from datetime import UTC, datetime

from sqlmodel import func, select

from app.core.base_repository import BaseRepository
from app.modules.pedidos.enums import EstadoPedido
from app.modules.pedidos.models import Pedido


class PedidoRepository(BaseRepository[Pedido]):
    def __init__(self, session):
        super().__init__(
            session,
            Pedido,
        )

    def list_by_usuario(self, usuario_id: int) -> list[Pedido] | None:
        statement = select(Pedido).where(
            Pedido.usuario_id == usuario_id,
        )

        return self.session.exec(statement).all()

    def count_by_estado(
        self,
        estado: EstadoPedido,
    ) -> int:
        statement = (
            select(func.count()).select_from(Pedido).where(Pedido.estado == estado)
        )

        return self.session.exec(statement).one()

    def list_filtered(
        self,
        usuario_id: int | None = None,
        skip: int = 0,
        limit: int = 20,
        estado: EstadoPedido | None = None,
    ) -> list[Pedido]:

        statement = select(Pedido)

        if usuario_id is not None:
            statement = statement.where(
                Pedido.usuario_id == usuario_id,
            )

        if estado is not None:
            statement = statement.where(
                Pedido.estado == estado,
            )

        statement = statement.offset(
            skip,
        ).limit(
            limit,
        )

        return self.session.exec(
            statement,
        ).all()

    def count_today(
        self,
    ) -> int:

        today = datetime.now(UTC).date()

        statement = (
            select(func.count())
            .select_from(Pedido)
            .where(
                func.date(Pedido.created_at) == today,
            )
        )

        return self.session.exec(
            statement,
        ).one()

    def total_delivered_revenue(
        self,
    ) -> float:

        statement = select(
            func.sum(Pedido.total),
        ).where(
            Pedido.estado == EstadoPedido.ENTREGADO,
        )

        revenue = self.session.exec(
            statement,
        ).one()

        return revenue or 0.0
