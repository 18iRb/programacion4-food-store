import { api } from "@/shared/api/axiosInstance";

import type { LoginData } from "../types/login";
import type { RegisterData } from "../types/register";
import type { User } from "../types/user";

export async function login(
    data: LoginData,
): Promise<void> {

    const body = new URLSearchParams();

    body.append(
        "username",
        data.email,
    );

    body.append(
        "password",
        data.password,
    );

    await api.post(
        "/auth/token",
        body,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        },
    );
}

export async function register(
    data: RegisterData,
): Promise<User> {

    const response = await api.post<User>(
        "/auth/register",
        data,
    );

    return response.data;
}

export async function getMe(): Promise<User> {

    const response = await api.get<User>(
        "/auth/me",
    );

    return response.data;
}

export async function logout(): Promise<void> {

    await api.post(
        "/auth/logout",
    );
}