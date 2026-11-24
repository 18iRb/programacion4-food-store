import type { Category } from "@/features/categorias";

export interface Product {
    id: number;
    categoria_id: number;
    nombre: string;
    descripcion: string;
    precio_base: number;
    imagen_url: string | null;
    stock: number;
    disponible: boolean;
    activo: boolean;
    categoria: Category;
}

export interface ProductsResponse {
    total: number;
    items: Product[];
}