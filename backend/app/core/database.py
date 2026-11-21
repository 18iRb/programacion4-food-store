from sqlmodel import Session, SQLModel, create_engine

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,
)


def get_session():
    with Session(engine) as session:
        yield session


def session_factory() -> Session:
    return Session(engine)


def create_all_tables() -> None:
    SQLModel.metadata.create_all(engine)
