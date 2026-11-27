import type { Product } from "@/features/productos/types/product";

export type EstadoPedido =
    | "PENDIENTE"
    | "EN_PREPARACION"
    | "ENTREGADO"
    | "CANCELADO";

export type FormaPago =
    | "EFECTIVO"
    | "TRANSFERENCIA";

export interface PedidoItem {
    producto_id: number;
    nombre_producto: string;
    precio_unitario: number;
    cantidad: number;
    subtotal: number;
}

export interface Pedido {
    id: number;
    usuario_id: number;
    estado: EstadoPedido;
    forma_pago: FormaPago;
    direccion_entrega: string;
    notas: string | null;
    total: number;
    created_at: string;
    updated_at: string;
    items: PedidoItem[];
}

export interface PaginatedPedidos {
    total: number;
    items: Pedido[];
}

export interface PedidoCreate {
    items: {
        producto_id: Product["id"];
        cantidad: number;
    }[],
    forma_pago: FormaPago;
    direccion_entrega: string;
    notas: string | null;
}