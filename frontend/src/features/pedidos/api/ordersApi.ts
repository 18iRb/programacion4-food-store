import { api } from "@/shared/api/axiosInstance";
import type { EstadoPedido, PaginatedPedidos, Pedido, PedidoCreate } from "../types/pedido";

type UpdateOrderStatus = {
    pedido_id: Pedido["id"],
    data: EstadoPedido
}

export async function getAllOrders() {
    const { data } = await api.get<PaginatedPedidos>("/pedidos");

    return data;
}

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

export async function changeOrderStatus({
    pedido_id,
    data,
}: UpdateOrderStatus) {
    const response = await api.patch<Pedido>(
        `/pedidos/${pedido_id}/estado`,
        data,
    );

    return response.data;
}