import { api } from "@/shared/api/axiosInstance";
import type { Category, CategoryCreate } from "../types/category";

type UpdateCategoryParams = {
    categoryId: Category["id"];
    data: {
        nombre: string;
        descripcion: string;
    };
};

export async function getCategories() {
    const { data } = await api.get<Category[]>(
        "/categorias"
    );

    return data;
}

export async function updateCategory({
    categoryId,
    data,
}: UpdateCategoryParams) {
    const response = await api.put<Category>(
        `/categorias/${categoryId}`,
        data,
    );

    return response.data;
}

export async function deleteCategory(
    categoryId: Category['id']
) {
    const { data } = await api.delete(
        `/categorias/${categoryId}`,
    )

    return data;
}

export async function createCategory(
    data: CategoryCreate,
) {
    const response = await api.post<Category>(
        "/categorias",
        data,
    );

    return response.data;
}