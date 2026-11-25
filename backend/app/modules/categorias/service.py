from app.core.exceptions import CategoriaNoEncontrada, NombreDuplicado
from app.modules.categorias.models import Categoria
from app.modules.categorias.schemas import (
    CategoriaCreate,
    CategoriaRead,
    CategoriaUpdate,
)
from app.modules.categorias.unit_of_work import CategoriaUnitOfWork


class CategoriaService:
    def __init__(
        self,
        uow: CategoriaUnitOfWork,
    ):
        self.uow = uow

    def _get_category_by_id(
        self,
        uow: CategoriaUnitOfWork,
        categoria_id: int,
    ) -> Categoria:

        categoria = uow.categorias.get_by_id(record_id=categoria_id)

        if categoria is None or not categoria.activo:
            raise CategoriaNoEncontrada(
                f"La categoría con ID {categoria_id} no existe o se encuentra desactivada.",
            )

        return categoria

    def _validate_name_exists(
        self,
        uow: CategoriaUnitOfWork,
        nombre: str,
    ) -> bool:

        return uow.categorias.get_by_nombre(nombre=nombre)

    def get_categories(
        self,
        skip: int = 0,
        limit: int = 20,
    ) -> list[CategoriaRead]:

        with self.uow as uow:
            categorias = uow.categorias.get_all_active()

            return [
                CategoriaRead.model_validate(
                    categoria,
                )
                for categoria in categorias
            ]

    def get_category_by_id(
        self,
        categoria_id: int,
    ) -> CategoriaRead:

        with self.uow as uow:
            categoria = self._get_category_by_id(
                uow=uow,
                categoria_id=categoria_id,
            )

            return CategoriaRead.model_validate(
                categoria,
            )

    def create_category(
        self,
        schema: CategoriaCreate,
    ) -> CategoriaRead:

        with self.uow as uow:
            if self._validate_name_exists(uow=uow, nombre=schema.nombre):
                raise NombreDuplicado(
                    f"Ya existe una categoría con el nombre '{schema.nombre}'.",
                )

            categoria = Categoria(**schema.model_dump())

            uow.categorias.add(categoria)

            return CategoriaRead.model_validate(
                categoria,
            )

    def update_category_by_id(
        self,
        categoria_id: int,
        schema: CategoriaUpdate,
    ) -> CategoriaRead:

        with self.uow as uow:
            categoria = self._get_category_by_id(
                uow=uow,
                categoria_id=categoria_id,
            )

            update_data = schema.model_dump(
                exclude_unset=True,
            )

            if "nombre" in update_data:
                categoria_con_mismo_nombre = uow.categorias.get_by_nombre(
                    update_data["nombre"]
                )

                if (
                    categoria_con_mismo_nombre
                    and categoria_con_mismo_nombre.id != categoria.id
                ):
                    raise NombreDuplicado(
                        f"Ya existe otra categoría con el nombre '{update_data['nombre']}'.",
                    )

            for field, value in update_data.items():
                setattr(
                    categoria,
                    field,
                    value,
                )

            return CategoriaRead.model_validate(
                categoria,
            )

    def delete_category_by_id(
        self,
        categoria_id: int,
    ) -> None:

        with self.uow as uow:
            categoria = self._get_category_by_id(
                uow=uow,
                categoria_id=categoria_id,
            )

            categoria.activo = False
