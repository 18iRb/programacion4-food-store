import { useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type PaginationState,
    type SortingState,
} from "@tanstack/react-table";

import { AdminNavigation } from "@/features/admin/components/AdminNavigation";

import { useAllOrders } from "../hooks/useAllOrders";
import { useChangeOrderStatus } from "../hooks/useChangeOrderStatus";
import { useCancelOrder } from "../hooks/useCancelOrder";

import { useOrderColumns } from "../components/orderColumns";

function AdminPedidosPage() {
    const {
        data,
        isLoading,
        error,
    } = useAllOrders();

    const changeStatusMutation =
        useChangeOrderStatus();

    const cancelOrderMutation =
        useCancelOrder();

    const [sorting, setSorting] =
        useState<SortingState>([]);

    const [pagination, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 5,
        });

    const columns = useOrderColumns({
        onPrepare: (pedidoId) =>
            changeStatusMutation.mutate({
                pedido_id: pedidoId,
                data: "EN_PREPARACION",
            }),

        onDeliver: (pedidoId) =>
            changeStatusMutation.mutate({
                pedido_id: pedidoId,
                data: "ENTREGADO",
            }),

        onCancel: (pedidoId) =>
            cancelOrderMutation.mutate(
                pedidoId,
            ),
    });

    const table = useReactTable({
        data: data?.items ?? [],
        columns,

        state: {
            sorting,
            pagination,
        },

        onSortingChange:
            setSorting,

        onPaginationChange:
            setPagination,

        getCoreRowModel:
            getCoreRowModel(),

        getSortedRowModel:
            getSortedRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),
    });

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
                Error al cargar pedidos.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <AdminNavigation />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Administración de Pedidos
                </h1>

                <p className="text-2xl font-bold text-orange-600">
                    Total: {data?.total ?? 0}
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full">
                    <thead>
                        {table
                            .getHeaderGroups()
                            .map(
                                (
                                    headerGroup,
                                ) => (
                                    <tr
                                        key={
                                            headerGroup.id
                                        }
                                        className="
                                            border-b
                                            bg-slate-50
                                            text-left
                                        "
                                    >
                                        {headerGroup.headers.map(
                                            (
                                                header,
                                            ) => (
                                                <th
                                                    key={
                                                        header.id
                                                    }
                                                    className="p-4"
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header
                                                                .column
                                                                .columnDef
                                                                .header,
                                                            header.getContext(),
                                                        )}
                                                </th>
                                            ),
                                        )}
                                    </tr>
                                ),
                            )}
                    </thead>

                    <tbody>
                        {table
                            .getRowModel()
                            .rows.map(
                                (row) => (
                                    <tr
                                        key={
                                            row.id
                                        }
                                        className="border-b"
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map(
                                                (
                                                    cell,
                                                ) => (
                                                    <td
                                                        key={
                                                            cell.id
                                                        }
                                                        className="p-4"
                                                    >
                                                        {flexRender(
                                                            cell
                                                                .column
                                                                .columnDef
                                                                .cell,
                                                            cell.getContext(),
                                                        )}
                                                    </td>
                                                ),
                                            )}
                                    </tr>
                                ),
                            )}
                    </tbody>
                </table>

                <div
                    className="flex items-center justify-between border-t bg-slate-50 px-4 py-3"
                >
                    <button
                        type="button"
                        onClick={() =>
                            table.previousPage()
                        }
                        disabled={
                            !table.getCanPreviousPage()
                        }
                        className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        ← Anterior
                    </button>

                    <span
                        className="text-sm font-medium text-slate-600"
                    >
                        Página{" "}
                        <span className="font-bold">
                            {table.getState()
                                .pagination.pageIndex + 1}
                        </span>{" "}
                        de{" "}
                        <span className="font-bold">
                            {table.getPageCount()}
                        </span>
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            table.nextPage()
                        }
                        disabled={
                            !table.getCanNextPage()
                        }
                        className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Siguiente →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminPedidosPage;