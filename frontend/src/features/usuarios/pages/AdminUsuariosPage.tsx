import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type PaginationState, type SortingState } from "@tanstack/react-table";
import { useUserColumns } from "../components/userColumns";
import { AdminNavigation } from "@/features/admin/components/AdminNavigation";

function AdminUsuariosPage() {

    const {
        data: usersData,
        isLoading,
        error,
    } = useUsers();

    const [sorting, setSorting] =
        useState<SortingState>([]);

    const [pagination, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 5,
        });

    const columns = useUserColumns();

    const table = useReactTable({
        data: usersData ?? [],
        columns,

        state: {
            sorting,
            pagination,
        },

        onSortingChange: setSorting,
        onPaginationChange: setPagination,

        getCoreRowModel:
            getCoreRowModel(),

        getSortedRowModel:
            getSortedRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),
    });


    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <AdminNavigation />

            <h1 className="mb-6 text-3xl font-bold">
                Usuarios
            </h1>

            <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="border-b bg-slate-100 p-4 text-left"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <button
                                                    type="button"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="flex items-center gap-2 uppercase tracking-wide text-xs font-bold text-slate-600 transition-colors hover:text-orange-600"

                                                >
                                                    <span>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                    </span>

                                                    <span className="text-xs text-slate-400">
                                                        {{
                                                            asc: "▲",
                                                            desc: "▼",
                                                        }[
                                                            header.column.getIsSorted() as string
                                                        ] ?? ""}
                                                    </span>
                                                </button>
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-slate-50 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border-b p-4"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-between border-t bg-slate-50 px-4 py-3">
                    <button
                        type="button"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        ← Anterior
                    </button>

                    <span className="text-sm font-medium text-slate-600">
                        Página{" "}
                        <span className="font-bold">
                            {table.getState().pagination.pageIndex + 1}
                        </span>
                        {" "}de{" "}
                        <span className="font-bold">
                            {table.getPageCount()}
                        </span>
                    </span>

                    <button
                        type="button"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Siguiente →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminUsuariosPage