from sqlmodel import Session, select

from app.core.database import engine
from app.core.security import hash_password
from app.modules.categorias.models import Categoria
from app.modules.productos.models import Producto
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


def seed_categories(
    session: Session,
) -> None:

    categories = [
        {
            "nombre": "Hamburguesas",
            "descripcion": "Hamburguesas artesanales",
        },
        {
            "nombre": "Pizzas",
            "descripcion": "Pizzas tradicionales",
        },
        {
            "nombre": "Bebidas",
            "descripcion": "Bebidas frías y calientes",
        },
    ]

    for data in categories:
        category = session.exec(
            select(Categoria).where(
                Categoria.nombre == data["nombre"],
            )
        ).first()

        if category is None:
            session.add(
                Categoria(
                    nombre=data["nombre"],
                    descripcion=data["descripcion"],
                    activo=True,
                )
            )

            print(f"✅ Categoría creada: {data['nombre']}")


def seed_products(
    session: Session,
) -> None:
    hamburguesas = session.exec(
        select(Categoria).where(
            Categoria.nombre == "Hamburguesas",
        )
    ).first()

    pizzas = session.exec(
        select(Categoria).where(
            Categoria.nombre == "Pizzas",
        )
    ).first()

    bebidas = session.exec(
        select(Categoria).where(
            Categoria.nombre == "Bebidas",
        )
    ).first()

    products = [
        {
            "nombre": "Hamburguesa Clásica",
            "descripcion": "Hamburguesa simple",
            "precio_base": 7500,
            "stock": 50,
            "categoria_id": hamburguesas.id,
        },
        {
            "nombre": "Hamburguesa Doble",
            "descripcion": "Doble carne y queso",
            "precio_base": 9500,
            "stock": 40,
            "categoria_id": hamburguesas.id,
        },
        {
            "nombre": "Hamburguesa Veggie",
            "descripcion": "Opción vegetariana",
            "precio_base": 8000,
            "stock": 30,
            "categoria_id": hamburguesas.id,
        },
        {
            "nombre": "Pizza Muzzarella",
            "descripcion": "Pizza clásica",
            "precio_base": 12000,
            "stock": 20,
            "categoria_id": pizzas.id,
        },
        {
            "nombre": "Pizza Napolitana",
            "descripcion": "Tomate y ajo",
            "precio_base": 13000,
            "stock": 20,
            "categoria_id": pizzas.id,
        },
        {
            "nombre": "Pizza Especial",
            "descripcion": "Jamón y morrones",
            "precio_base": 15000,
            "stock": 20,
            "categoria_id": pizzas.id,
        },
        {
            "nombre": "Coca Cola 500ml",
            "descripcion": "Gaseosa",
            "precio_base": 2500,
            "stock": 100,
            "categoria_id": bebidas.id,
        },
        {
            "nombre": "Agua Mineral",
            "descripcion": "Agua sin gas",
            "precio_base": 2000,
            "stock": 100,
            "categoria_id": bebidas.id,
        },
    ]

    for data in products:
        product = session.exec(
            select(Producto).where(
                Producto.nombre == data["nombre"],
            )
        ).first()

        if product is None:
            session.add(
                Producto(
                    nombre=data["nombre"],
                    descripcion=data["descripcion"],
                    precio_base=data["precio_base"],
                    stock=data["stock"],
                    disponible=True,
                    activo=True,
                    categoria_id=data["categoria_id"],
                )
            )

            print(f"✅ Producto creado: {data['nombre']}")


def run_seed():

    with Session(engine) as session:
        seed_admin(session)
        seed_user(session)

        seed_categories(session)

        seed_products(session)

        session.commit()

        print("✅ Seed completado")


if __name__ == "__main__":
    run_seed()
