import { api } from "@/shared/api/axiosInstance";
import type { Category } from "../types/category";

export async function getCategories() {
    const { data } = await api.get<Category[]>(
        "/categorias"
    );

    return data;
}