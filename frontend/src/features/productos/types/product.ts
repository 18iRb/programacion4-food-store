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

export interface ProductCreate {
    nombre: string;
    descripcion: string | null;
    precio_base: number;
    imagen_url: string | null;
    stock: number;
    disponible: boolean;
    categoria_id: number;
}

export interface ProductUpdate {
    nombre: string | null;
    descripcion: string | null;
    precio_base: number | null;
    imagen_url: string | null;
    stock: number | null;
    disponible: boolean | null;
    categoria_id: number | null;
}