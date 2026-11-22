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
