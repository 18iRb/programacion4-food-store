import { api } from "@/shared/api/axiosInstance";
import type { Product, ProductCreate, ProductsResponse, ProductUpdate } from "../types/product";

type UpdateProductParams = {
    product_id: Product["id"],
    data: ProductUpdate
}

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

export async function createProduct(
    data: ProductCreate,
) {

    const response = await api.post<Product>(
        `/productos`,
        data
    )

    return response.data;
}

export async function updateProduct({
    product_id,
    data,
}: UpdateProductParams) {
    const response = await api.put<Product>(
        `/productos/${product_id}`,
        data,
    );

    return response.data;
}

export async function deleteProduct(
    product_id: Product["id"],
) {

    const { data } = await api.delete(
        `/productos/${product_id}`,
    )

    return data;
}