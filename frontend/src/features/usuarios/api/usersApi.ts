import { api } from "@/shared/api/axiosInstance";
import type { User } from "../types/user";

export async function getUsers() {
    const { data } = await api.get<User[]>(
        `/admin/usuarios`
    );

    return data;
}

export async function activateUser(
    user_id: User["id"],
) {
    const { data } = await api.post<User>(
        `/admin/usuarios/${user_id}/activar`,
    )

    return data;
}

export async function deactivateUser(
    user_id: User["id"],
) {
    const { data } = await api.post<User>(
        `/admin/usuarios/${user_id}/desactivar`,
    )

    return data;
}