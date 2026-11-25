import axios from "axios";

import { useAuthStore } from "@/store/authStore";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const status =
            error.response?.status;

        const url =
            error.config?.url ?? "";

        const detail =
            error.response?.data?.detail ?? "";

        const isLogin =
            url.includes("/auth/token");

        const isMe =
            url.includes("/auth/me");

        const isUserDisabled =
            status === 400 &&
            detail ===
            "La cuenta se encuentra desactivada.";

        if (
            (
                status === 401 &&
                !isLogin &&
                !isMe
            ) ||
            isUserDisabled
        ) {
            useAuthStore
                .getState()
                .clearAuth();

            if (
                window.location.pathname !==
                "/login"
            ) {
                window.location.href =
                    "/login";
            }
        }

        return Promise.reject(error);
    },
);