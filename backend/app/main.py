from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import create_all_tables
from app.db.seed import run_seed


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


@app.get("/")
def health_check():
    return {
        "message": "Food Store API",
    }
