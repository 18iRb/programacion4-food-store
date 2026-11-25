import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
    login as loginRequest,
    logout as logoutRequest,
    getMe,
} from "@/features/auth";

import type {
    LoginData,
    User,
} from "@/features/auth";

interface AuthStoreState {
    user: User | null;

    isLoading: boolean;

    login: (
        data: LoginData,
    ) => Promise<void>;

    logout: () => Promise<void>;

    checkSession: () => Promise<void>;

    clearAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
    persist(
        (set) => ({
            user: null,

            isLoading: false,

            login: async (
                data: LoginData,
            ) => {
                set({
                    isLoading: true,
                });

                try {
                    await loginRequest(data);

                    const user = await getMe();

                    set({
                        user,
                    });
                } finally {
                    set({
                        isLoading: false,
                    })
                }
            },

            logout: async () => {
                set({
                    isLoading: true,
                });

                try {
                    await logoutRequest();

                    set({
                        user: null
                    });
                } finally {
                    set({
                        isLoading: false,
                    })
                }
            },

            checkSession: async () => {
                set({
                    isLoading: true,
                })

                try {
                    const user = await getMe();

                    set({
                        user
                    });
                } catch {
                    set({
                        user: null
                    })
                } finally {
                    set({
                        isLoading: false,
                    })
                }
            },

            clearAuth: () => {
                set({
                    user: null,
                })
            }
        }), {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
            user: state.user
        })
    }),
);