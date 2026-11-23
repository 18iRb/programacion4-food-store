from app.core.exceptions import UsuarioNoEncontrado
from app.modules.usuarios.models import User
from app.modules.usuarios.schemas import UserPublic
from app.modules.usuarios.unit_of_work import UserUnitOfWork


class UserService:
    def __init__(
        self,
        uow: UserUnitOfWork,
    ):
        self.uow = uow

    def _get_user_by_id(
        self,
        uow: UserUnitOfWork,
        user_id: int,
    ) -> User:

        user = uow.users.get_by_id(record_id=user_id)

        if user is None:
            raise UsuarioNoEncontrado(
                f"El usuario con ID {user_id} no existe.",
            )

        return user

    def get_users(
        self,
        skip: int = 0,
        limit: int = 20,
    ) -> list[UserPublic]:

        with self.uow as uow:
            users = uow.users.get_all(
                offset=skip,
                limit=limit,
            )

            return [
                UserPublic.model_validate(
                    user,
                )
                for user in users
            ]

    def activate_user(
        self,
        user_id: int,
    ) -> UserPublic:

        with self.uow as uow:
            user = self._get_user_by_id(
                uow=uow,
                user_id=user_id,
            )

            user.disabled = False

            return UserPublic.model_validate(
                user,
            )

    def deactivate_user(
        self,
        user_id: int,
    ) -> UserPublic:

        with self.uow as uow:
            user = self._get_user_by_id(
                uow=uow,
                user_id=user_id,
            )

            # TODO:
            # Validar que el administrador autenticado
            # no pueda desactivarse a sí mismo.
            # Requiere current_user proveniente de Auth/Deps.

            user.disabled = True

            return UserPublic.model_validate(
                user,
            )
