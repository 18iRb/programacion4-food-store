import { api } from "@/shared/api/axiosInstance";
import type { PaginatedPedidos, Pedido } from "../types/pedido";

export async function getOrders() {
    const { data } = await api.get<PaginatedPedidos>("/pedidos/mis-pedidos");

    return data;
}

export async function cancelOrder(
    orderId: number,
) {
    const { data } = await api.patch<Pedido>(
        `/pedidos/${orderId}/cancelar`,
    );

    return data;
}