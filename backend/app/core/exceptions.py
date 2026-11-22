class DomainException(Exception):
    """Excepción base para todas las reglas de negocio."""

    pass


# =========================
# 404 - Not Found
# =========================


class UsuarioNoEncontrado(DomainException):
    pass


class CategoriaNoEncontrada(DomainException):
    pass


class ProductoNoEncontrado(DomainException):
    pass


class PedidoNoEncontrado(DomainException):
    pass


# =========================
# 409 - Conflicts
# =========================


class UsuarioDuplicado(DomainException):
    pass


class NombreDuplicado(DomainException):
    pass


# =========================
# 403 - Forbidden
# =========================


class PedidoAjeno(DomainException):
    pass


# =========================
# 400 - Business Rules
# =========================


class StockInsuficiente(DomainException):
    pass


class ProductoNoDisponible(DomainException):
    pass


class ProductoRepetido(DomainException):
    pass


class TransicionInvalida(DomainException):
    pass
