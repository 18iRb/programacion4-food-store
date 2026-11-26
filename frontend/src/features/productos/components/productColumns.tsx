import type { ColumnDef } from "@tanstack/react-table";

import { useDeleteProduct } from "../hooks/useDeleteProduct";

import type { Product } from "../types/product";

type ProductColumnsProps = {
    onEdit: (product: Product) => void;
};

export function useProductColumns({
    onEdit,
}: ProductColumnsProps): ColumnDef<Product>[] {

    const deleteMutation =
        useDeleteProduct();

    return [
        {
            accessorKey: "id",
            header: "ID",
        },

        {
            accessorKey: "imagen_url",
            header: "Imagen",

            cell: ({ row }) => {
                const imageUrl =
                    row.original.imagen_url;

                return (
                    <img
                        src={
                            imageUrl ||
                            "https://placehold.co/60x60"
                        }
                        alt={row.original.nombre}
                        className="
                    h-14
                    w-14
                    rounded-lg
                    object-cover
                    border
                "
                    />
                );
            },
        },

        {
            accessorKey: "nombre",
            header: "Producto",
        },

        {
            accessorKey: "categoria.nombre",
            header: "Categoría",

            cell: ({ row }) => (
                <span className="font-medium">
                    {row.original.categoria.nombre}
                </span>
            ),
        },

        {
            accessorKey: "precio_base",
            header: "Precio",

            cell: ({ row }) => (
                <span className="font-semibold">
                    $
                    {row.original.precio_base.toLocaleString(
                        "es-AR",
                    )}
                </span>
            ),
        },

        {
            accessorKey: "stock",
            header: "Stock",

            cell: ({ row }) => {
                const stock =
                    row.original.stock;

                return (
                    <span
                        className={
                            stock > 0
                                ? "font-medium text-green-600"
                                : "font-medium text-red-600"
                        }
                    >
                        {stock}
                    </span>
                );
            },
        },

        {
            accessorKey: "disponible",
            header: "Estado",

            cell: ({ row }) => {
                const disponible =
                    row.original.disponible;

                return (
                    <span
                        className={
                            disponible
                                ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                        }
                    >
                        {disponible
                            ? "Disponible"
                            : "No disponible"}
                    </span>
                );
            },
        },

        {
            id: "actions",

            header: "Acciones",

            cell: ({ row }) => {
                const product =
                    row.original;

                return (
                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() => {
                                if (
                                    product.disponible
                                ) {
                                    deleteMutation.mutate(
                                        product.id,
                                    );
                                }
                            }}
                            className={`
                                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${product.disponible
                                    ? "bg-green-500"
                                    : "bg-slate-300"
                                }
                            `}
                        >
                            <span
                                className={`
                                    inline-block h-4 w-4 transform rounded-full bg-white transition
                                    ${product.disponible
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                    }
                                `}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                onEdit(product)
                            }
                            className="p-2 transition-colors hover:bg-slate-100"
                        >
                            ✏️
                        </button>

                    </div>
                );
            },
        },
    ];
}