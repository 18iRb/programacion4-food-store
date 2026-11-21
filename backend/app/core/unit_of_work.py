from app.core.database import session_factory


class UnitOfWork:
    def __enter__(self):
        self.session = session_factory()
        return self

    def __exit__(
        self,
        exc_type,
        exc_val,
        exc_tb,
    ):
        try:
            if exc_type:
                self.session.rollback()
            else:
                self.session.commit()
        finally:
            self.session.close()
