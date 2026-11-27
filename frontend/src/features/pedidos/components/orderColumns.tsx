import type { ColumnDef } from "@tanstack/react-table";

import type {
    EstadoPedido,
    Pedido,
} from "../types/pedido";

type OrderColumnsProps = {
    onPrepare: (
        pedidoId: Pedido["id"],
    ) => void;

    onDeliver: (
        pedidoId: Pedido["id"],
    ) => void;

    onCancel: (
        pedidoId: Pedido["id"],
    ) => void;
};

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

export function useOrderColumns({
    onPrepare,
    onDeliver,
    onCancel,
}: OrderColumnsProps): ColumnDef<Pedido>[] {

    return [
        {
            accessorKey: "id",
            header: "#",

            cell: ({ row }) => (
                <span className="font-medium">
                    #{row.original.id}
                </span>
            ),
        },

        {
            accessorKey: "estado",
            header: "Estado",

            cell: ({ row }) => (
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getEstadoClasses(row.original.estado)}
                    `}
                >
                    {row.original.estado}
                </span>
            ),
        },

        {
            accessorKey: "forma_pago",
            header: "Pago",
        },

        {
            accessorKey: "direccion_entrega",
            header: "Dirección",
        },

        {
            accessorKey: "total",
            header: "Total",

            cell: ({ row }) => (
                <span className="font-medium">
                    $
                    {row.original.total.toLocaleString(
                        "es-AR",
                    )}
                </span>
            ),
        },

        {
            accessorKey: "created_at",
            header: "Fecha",

            cell: ({ row }) =>
                new Date(
                    row.original.created_at,
                ).toLocaleDateString(
                    "es-AR",
                ),
        },

        {
            id: "items",

            enableSorting: false,

            header: "Productos",

            cell: ({ row }) => {
                const amount =
                    row.original.items.length;

                return (
                    <span>
                        {amount}{" "}
                        {amount === 1
                            ? "producto"
                            : "productos"}
                    </span>
                );
            },
        },

        {
            id: "actions",

            enableSorting: false,

            header: "Acciones",

            cell: ({ row }) => {

                const pedido =
                    row.original;

                return (
                    <div className="flex flex-wrap gap-2">

                        {pedido.estado ===
                            "PENDIENTE" && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onPrepare(
                                                pedido.id,
                                            )
                                        }
                                        className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
                                    >
                                        Preparar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onCancel(
                                                pedido.id,
                                            )
                                        }
                                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}

                        {pedido.estado ===
                            "EN_PREPARACION" && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onDeliver(
                                                pedido.id,
                                            )
                                        }
                                        className="rounded-lg bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
                                    >
                                        Entregar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onCancel(
                                                pedido.id,
                                            )
                                        }
                                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}

                        {(pedido.estado ===
                            "ENTREGADO" ||
                            pedido.estado ===
                            "CANCELADO") && (
                                <span
                                    className="
                                    text-sm
                                    text-slate-400
                                "
                                >
                                    Sin acciones
                                </span>
                            )}

                    </div>
                );
            },
        },
    ];
}