import { api } from "@/shared/api/axiosInstance";
import type { Product, ProductsResponse } from "../types/product";

export async function getProducts() {
    const { data } = await api.get<ProductsResponse>(
        "/productos"
    );

    return data;
}

export async function getProductById(
    productId: Product["id"]
) {
    const { data } = await api.get<Product>(
        `/productos/${productId}`
    );

    return data;
}