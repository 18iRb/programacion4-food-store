import { useState } from "react";
import { Link } from "react-router-dom";

import { useOrders } from "../hooks/useOrders";
import { useCancelOrder } from "../hooks/useCancelOrder";
import type { EstadoPedido } from "../types/pedido";

function getEstadoClasses(
    estado: EstadoPedido,
) {
    switch (estado) {
        case "PENDIENTE":
            return "bg-yellow-100 text-yellow-700";

        case "EN_PREPARACION":
            return "bg-blue-100 text-blue-700";

        case "ENTREGADO":
            return "bg-green-100 text-green-700";

        case "CANCELADO":
            return "bg-red-100 text-red-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
}

function MisPedidosPage() {
    const {
        data,
        isLoading,
        error,
    } = useOrders();

    const cancelOrderMutation =
        useCancelOrder();

    const [expandedOrderId, setExpandedOrderId] =
        useState<number | null>(null);

    if (isLoading) {
        return (
            <div className="p-6">
                Cargando pedidos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                No se pudieron cargar los pedidos.
            </div>
        );
    }

    if (!data?.items.length) {
        return (
            <div className="mx-auto max-w-5xl p-6">
                <h1 className="mb-6 text-3xl font-bold">
                    Mis pedidos
                </h1>

                <div className="rounded-xl border bg-white p-8 text-center">
                    <p className="mb-4 text-slate-600">
                        Todavía no tenés pedidos registrados.
                    </p>

                    <Link
                        to="/"
                        className="inline-block rounded-lg bg-orange-600 px-6 py-3 text-white"
                    >
                        Ir al catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Mis pedidos
                </h1>

                <p className="text-2xl font-bold text-orange-600">
                    Total pedidos: {data.total}
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-slate-50 text-left">
                            <th className="p-4">
                                Pedido
                            </th>

                            <th className="p-4">
                                Estado
                            </th>

                            <th className="p-4">
                                Forma de pago
                            </th>

                            <th className="p-4">
                                Dirección
                            </th>

                            <th className="p-4">
                                Total
                            </th>

                            <th className="p-4">
                                Fecha
                            </th>

                            <th className="p-4">
                                Productos
                            </th>

                            <th className="p-4">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.items.map((pedido) => (
                            <tr
                                key={pedido.id}
                                className="border-b"
                            >
                                <td className="p-4 font-medium">
                                    #{pedido.id}
                                </td>

                                {expandedOrderId === pedido.id ? (
                                    <>
                                        <td
                                            colSpan={6}
                                            className="p-4 align-middle"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex flex-wrap gap-3">
                                                    {pedido.items.map((item) => (
                                                        <span
                                                            key={`${pedido.id}-${item.producto_id}`}
                                                            className="text-sm text-blue-600"
                                                        >
                                                            {item.nombre_producto}
                                                            <span className="font-medium">
                                                                {" "}×{item.cantidad}
                                                            </span>
                                                        </span>
                                                    ))}
                                                </div>

                                                {pedido.notas && (
                                                    <p className="text-xs text-slate-500">
                                                        Notas: {pedido.notas}
                                                    </p>
                                                )}
                                            </div>
                                        </td>

                                        <td className="p-4 align-middle">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        setExpandedOrderId(null)
                                                    }
                                                    className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
                                                >
                                                    Ocultar
                                                </button>

                                                {pedido.estado ===
                                                    "PENDIENTE" && (
                                                        <button
                                                            onClick={() =>
                                                                cancelOrderMutation.mutate(
                                                                    pedido.id,
                                                                )
                                                            }
                                                            className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    )}
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-medium ${getEstadoClasses(
                                                    pedido.estado,
                                                )}`}
                                            >
                                                {pedido.estado}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {pedido.forma_pago}
                                        </td>

                                        <td className="p-4">
                                            {pedido.direccion_entrega}
                                        </td>

                                        <td className="p-4 font-medium">
                                            $
                                            {pedido.total.toLocaleString(
                                                "es-AR",
                                            )}
                                        </td>

                                        <td className="p-4">
                                            {new Date(
                                                pedido.created_at,
                                            ).toLocaleDateString(
                                                "es-AR",
                                            )}
                                        </td>

                                        <td className="p-4">
                                            {pedido.items.length}
                                        </td>

                                        <td className="p-4">
                                            <button
                                                onClick={() =>
                                                    setExpandedOrderId(
                                                        pedido.id,
                                                    )
                                                }
                                                className="rounded-lg border px-3 py-1 text-sm"
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MisPedidosPage;