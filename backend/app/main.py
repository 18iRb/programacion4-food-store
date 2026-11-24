from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.database import create_all_tables
from app.core.exceptions import (
    CategoriaNoEncontrada,
    CredencialesInvalidas,
    NombreDuplicado,
    OperacionNoPermitida,
    PedidoAjeno,
    PedidoNoEncontrado,
    ProductoNoDisponible,
    ProductoNoEncontrado,
    ProductoRepetido,
    StockInsuficiente,
    TransicionInvalida,
    UsuarioDesactivado,
    UsuarioDuplicado,
    UsuarioNoEncontrado,
)
from app.db.seed import run_seed
from app.modules.auth.router import router as auth_router
from app.modules.categorias.router import router as categorias_router

# TODO: PROVISORIO
from app.modules.pedidos.models import (
    DetallePedido,
    Pedido,
)
from app.modules.productos.router import router as productos_router
from app.modules.usuarios.router import router as admin_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Inicializando base de datos...")

    create_all_tables()

    run_seed()

    print("Base de datos inicializada.")

    yield


app = FastAPI(
    title="Food Store API",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_ORIGIN,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======================================================
# Exception Handlers
# ======================================================


@app.exception_handler(UsuarioNoEncontrado)
@app.exception_handler(CategoriaNoEncontrada)
@app.exception_handler(ProductoNoEncontrado)
@app.exception_handler(PedidoNoEncontrado)
async def not_found_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=404,
        content={
            "detail": str(exc),
        },
    )


@app.exception_handler(UsuarioDuplicado)
@app.exception_handler(NombreDuplicado)
async def conflict_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=409,
        content={
            "detail": str(exc),
        },
    )


@app.exception_handler(CredencialesInvalidas)
async def unauthorized_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=401,
        content={
            "detail": str(exc),
        },
    )


@app.exception_handler(UsuarioDesactivado)
@app.exception_handler(OperacionNoPermitida)
@app.exception_handler(StockInsuficiente)
@app.exception_handler(ProductoNoDisponible)
@app.exception_handler(ProductoRepetido)
@app.exception_handler(TransicionInvalida)
async def business_rule_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=400,
        content={
            "detail": str(exc),
        },
    )


@app.exception_handler(PedidoAjeno)
async def forbidden_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=403,
        content={
            "detail": str(exc),
        },
    )


# ======================================================
# Health Check
# ======================================================


@app.get("/")
def health_check():
    return {
        "message": "Food Store API",
    }


# ======================================================
# Routers
# ======================================================

app.include_router(
    auth_router,
    prefix="/api/v1",
)

app.include_router(
    admin_router,
    prefix="/api/v1",
)

app.include_router(
    categorias_router,
    prefix="/api/v1",
)

app.include_router(
    productos_router,
    prefix="/api/v1",
)
