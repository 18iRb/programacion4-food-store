import { api } from "@/shared/api/axiosInstance";
import type { PaginatedPedidos, Pedido, PedidoCreate } from "../types/pedido";

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

export async function createOrder(
    data: PedidoCreate,
) {
    const response = await api.post(
        "/pedidos",
        data,
    );

    return response.data;
}