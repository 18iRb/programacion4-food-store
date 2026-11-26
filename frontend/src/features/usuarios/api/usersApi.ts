import { api } from "@/shared/api/axiosInstance";
import type { User } from "../types/user";

export async function getUsers() {
    const { data } = await api.get<User[]>(
        `/admin/usuarios`
    );

    return data;
}