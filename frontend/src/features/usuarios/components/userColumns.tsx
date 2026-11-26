import type { ColumnDef } from "@tanstack/react-table";

import { useActivateUser } from "../hooks/useActivateUser";
import { useDeactivateUser } from "../hooks/useDeactivateUser";

import type { User } from "../types/user";

export function useUserColumns(): ColumnDef<User>[] {
    const activateMutation = useActivateUser();
    const deactivateMutation = useDeactivateUser();

    return [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "username",
            header: "Usuario",
        },
        {
            accessorKey: "full_name",
            header: "Nombre",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Rol",
        },
        {
            accessorKey: "disabled",
            header: "Estado",

            cell: ({ row }) => {
                const disabled =
                    row.original.disabled;

                return (
                    <span
                        className={
                            disabled
                                ? "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                                : "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                        }
                    >
                        {disabled
                            ? "Desactivado"
                            : "Activo"}
                    </span>
                );
            },
        },
        {
            id: "actions",

            header: "Acciones",

            cell: ({ row }) => {
                const user = row.original;

                return (
                    <button
                        type="button"
                        onClick={() => {
                            if (user.disabled) {
                                activateMutation.mutate(
                                    user.id,
                                );
                            } else {
                                deactivateMutation.mutate(
                                    user.id,
                                );
                            }
                        }}
                        className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                            ${user.disabled
                                ? "bg-slate-300"
                                : "bg-green-500"
                            }
                        `}
                    >
                        <span
                            className={`
                                inline-block h-4 w-4 transform rounded-full bg-white transition
                                ${user.disabled
                                    ? "translate-x-1"
                                    : "translate-x-6"
                                }
                            `}
                        />
                    </button>
                );
            },
        },
    ];
}