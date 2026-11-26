import type { ColumnDef } from "@tanstack/react-table";

import type { User } from "../types/user";

export const userColumns: ColumnDef<User>[] = [
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
        cell: ({ row }) =>
            row.original.disabled
                ? "Desactivado"
                : "Activo",
    },
];