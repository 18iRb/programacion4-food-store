from sqlmodel import Session, select

from app.core.database import engine
from app.core.security import hash_password
from app.modules.usuarios.models import User


def seed_admin(session: Session) -> None:
    admin = session.exec(
        select(User).where(
            User.username == "admin",
        )
    ).first()

    if admin is None:
        admin = User(
            username="admin",
            full_name="Administrador",
            email="admin@foodstore.com",
            hashed_password=hash_password(
                "Admin1234!",
            ),
            role="admin",
            disabled=False,
        )

        session.add(admin)

        print("✅ Admin creado")
    else:
        print("ℹ️ Admin ya existe")


def seed_user(session: Session) -> None:
    user = session.exec(
        select(User).where(
            User.username == "usuario",
        )
    ).first()

    if user is None:
        user = User(
            username="usuario",
            full_name="Usuario Demo",
            email="usuario@foodstore.com",
            hashed_password=hash_password(
                "Usuario1234!",
            ),
            role="user",
            disabled=False,
        )

        session.add(user)

        print("✅ Usuario demo creado")
    else:
        print("ℹ️ Usuario demo ya existe")


def run_seed():

    with Session(engine) as session:
        seed_admin(session)
        seed_user(session)

        # seed_categories(session)

        # seed_products(session)

        session.commit()

        print("✅ Seed completado")


if __name__ == "__main__":
    run_seed()
