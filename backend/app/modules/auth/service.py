from app.core.exceptions import (
    CredencialesInvalidas,
    UsuarioDesactivado,
    UsuarioDuplicado,
)
from app.core.security import (
    hash_password,
    verify_password,
)
from app.modules.usuarios.models import User
from app.modules.usuarios.schemas import (
    UserCreate,
    UserPublic,
)
from app.modules.usuarios.unit_of_work import UserUnitOfWork


class AuthService:
    def __init__(
        self,
        uow: UserUnitOfWork,
    ):
        self.uow = uow

    def _validate_username_exists(
        self,
        uow: UserUnitOfWork,
        username: str,
    ) -> None:

        username_existente = uow.users.get_by_username(
            username=username,
        )

        if username_existente:
            raise UsuarioDuplicado(
                f"El nombre de usuario '{username}' ya se encuentra registrado.",
            )

    def _validate_email_exists(
        self,
        uow: UserUnitOfWork,
        email: str,
    ) -> None:

        email_existente = uow.users.get_by_email(
            email=email,
        )

        if email_existente:
            raise UsuarioDuplicado(
                f"El correo electrónico '{email}' ya se encuentra registrado.",
            )

    def _get_by_email(
        self,
        uow: UserUnitOfWork,
        email: str,
    ) -> User:

        user = uow.users.get_by_email(
            email=email,
        )

        if user is None:
            raise CredencialesInvalidas(
                "Correo o contraseña incorrectos.",
            )

        return user

    def _validate_credentials(
        self,
        uow: UserUnitOfWork,
        email: str,
        password: str,
    ) -> User:

        user = self._get_by_email(
            uow=uow,
            email=email,
        )

        if user.disabled:
            raise UsuarioDesactivado(
                "La cuenta se encuentra desactivada.",
            )

        if not verify_password(
            plain=password,
            hashed=user.hashed_password,
        ):
            raise CredencialesInvalidas(
                "Correo o contraseña incorrectos.",
            )

        return user

    def register(
        self,
        schema: UserCreate,
    ) -> UserPublic:

        with self.uow as uow:
            self._validate_username_exists(
                uow=uow,
                username=schema.username,
            )

            self._validate_email_exists(
                uow=uow,
                email=schema.email,
            )

            hashed_password = hash_password(
                plain=schema.password,
            )

            user = User(
                username=schema.username,
                full_name=schema.full_name,
                email=schema.email,
                hashed_password=hashed_password,
            )

            uow.users.add(
                instance=user,
            )

            return UserPublic.model_validate(
                user,
            )

    def authenticate(
        self,
        email: str,
        password: str,
    ) -> UserPublic:

        with self.uow as uow:
            user = self._validate_credentials(
                uow=uow,
                email=email,
                password=password,
            )

            return UserPublic.model_validate(
                user,
            )

    def get_me(
        self,
        current_user: User,
    ) -> UserPublic:

        return UserPublic.model_validate(
            current_user,
        )
