import { useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type PaginationState,
    type SortingState,
} from "@tanstack/react-table";

import { Modal } from "@/shared/ui/Modal";

import { AdminNavigation } from "@/features/admin/components/AdminNavigation";

import { ProductForm } from "../components/ProductForm";
import { useProductColumns } from "../components/productColumns";

import { useProducts } from "../hooks/useProducts";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

import type {
    Product,
    ProductCreate,
    ProductUpdate,
} from "../types/product";

function AdminProductosPage() {
    const {
        data: productsData,
        isLoading,
        error,
    } = useProducts();

    const createProductMutation =
        useCreateProduct();

    const updateProductMutation =
        useUpdateProduct();

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [sorting, setSorting] =
        useState<SortingState>([]);

    const [pagination, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 5,
        });

    const columns = useProductColumns({
        onEdit: (product) => {
            setSelectedProduct(product);
            setIsModalOpen(true);
        },
    });

    const table = useReactTable({
        data: productsData?.items ?? [],
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
        return (
            <div>
                Cargando productos...
            </div>
        );
    }

    if (error) {
        return (
            <div>
                Error al cargar productos.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <AdminNavigation />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Productos
                </h1>

                <button
                    type="button"
                    onClick={() => {
                        setSelectedProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-700"
                >
                    + Nuevo producto
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map(
                            (headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(
                                        (header) => (
                                            <th
                                                key={header.id}
                                                className="
                                                    border-b
                                                    bg-slate-100
                                                    p-4
                                                    text-left
                                                "
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
                                                                ] ??
                                                                    ""}
                                                            </span>
                                                        </button>
                                                    )}
                                            </th>
                                        ),
                                    )}
                                </tr>
                            ),
                        )}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(
                            (row) => (
                                <tr
                                    key={row.id}
                                    className="
                                        hover:bg-slate-50
                                        transition-colors
                                    "
                                >
                                    {row
                                        .getVisibleCells()
                                        .map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="
                                                    border-b
                                                    p-4
                                                "
                                            >
                                                {flexRender(
                                                    cell.column
                                                        .columnDef
                                                        .cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        ))}
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

                    <span className="text-sm font-medium text-slate-600">
                        Página{" "}
                        <span className="font-bold">
                            {table.getState()
                                .pagination
                                .pageIndex + 1}
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                }}
                title={
                    selectedProduct
                        ? "Editar producto"
                        : "Nuevo producto"
                }
            >
                <ProductForm
                    initialValues={
                        selectedProduct ?? undefined
                    }
                    onSubmit={async (data) => {
                        if (selectedProduct) {
                            await updateProductMutation.mutateAsync(
                                {
                                    product_id:
                                        selectedProduct.id,
                                    data:
                                        data as ProductUpdate,
                                },
                            );
                        } else {
                            await createProductMutation.mutateAsync(
                                data as ProductCreate,
                            );
                        }

                        setIsModalOpen(false);
                        setSelectedProduct(null);
                    }}
                />
            </Modal>
        </div>
    );
}

export default AdminProductosPage;