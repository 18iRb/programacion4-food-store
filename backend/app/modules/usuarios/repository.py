from sqlmodel import select

from app.core.base_repository import BaseRepository
from app.modules.usuarios.models import User


class UserRepository(BaseRepository[User]):
    def __init__(self, session):
        super().__init__(
            session,
            User,
        )

    def get_by_username(self, username: str) -> User | None:
        statement = select(User).where(
            User.username == username,
        )

        return self.session.exec(statement).first()

    def get_by_email(self, email: str) -> User | None:
        statement = select(User).where(
            User.email == email,
        )

        return self.session.exec(statement).first()
