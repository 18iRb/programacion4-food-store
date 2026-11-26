import type { ColumnDef } from "@tanstack/react-table";

import { useDeleteCategory } from "../hooks/useDeleteCategory";

import type { Category } from "../types/category";

type CategoryColumnsProps = {
    onEdit: (category: Category) => void;
};

export function useCategoryColumns({
    onEdit,
}: CategoryColumnsProps): ColumnDef<Category>[] {

    const deleteMutation =
        useDeleteCategory();

    return [
        {
            accessorKey: "id",
            header: "ID",
        },

        {
            accessorKey: "nombre",
            header: "Nombre",
        },

        {
            accessorKey: "descripcion",
            header: "Descripción",
        },

        {
            accessorKey: "activo",
            header: "Estado",

            cell: ({ row }) => {
                const activo =
                    row.original.activo;

                return (
                    <span
                        className={
                            activo
                                ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                        }
                    >
                        {activo
                            ? "Activa"
                            : "Desactivada"}
                    </span>
                );
            },
        },

        {
            id: "actions",

            header: "Acciones",

            cell: ({ row }) => {
                const category =
                    row.original;

                return (
                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() => {
                                if (category.activo) {
                                    deleteMutation.mutate(
                                        category.id,
                                    );
                                }
                            }}
                            className={`
                                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                ${category.activo
                                    ? "bg-green-500"
                                    : "bg-slate-300"
                                }
                            `}
                        >
                            <span
                                className={`
                                    inline-block h-4 w-4 transform rounded-full bg-white transition
                                    ${category.activo
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                    }
                                `}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                onEdit(category)
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