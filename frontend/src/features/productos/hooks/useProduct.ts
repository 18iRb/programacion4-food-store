import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { getProductById } from "../api/productsApi";

export function useProduct(productId: Product["id"]) {
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId)
    })
}