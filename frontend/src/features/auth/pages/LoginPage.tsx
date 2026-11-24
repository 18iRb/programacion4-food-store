import { useForm } from "@tanstack/react-form";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useAuthStore } from "@/store/authStore";

import type { LoginData } from "../types/login";

const defaultValues: LoginData = {
    email: "",
    password: "",
};

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoading = useAuthStore(
        (s) => s.isLoading,
    );

    const login = useAuthStore(
        (s) => s.login,
    );

    const form = useForm({
        defaultValues,

        onSubmit: async ({ value }) => {

            await login(value);

            navigate(
                location.state?.from?.pathname ?? "/"
            );
        }
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Iniciar Sesión
                </h1>

                <p className="mb-6 text-center text-sm text-slate-500">
                    Ingresá con tu cuenta para continuar.
                </p>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();

                        void form.handleSubmit();
                    }}
                >
                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-1">
                                <label className="block text-sm font-medium">
                                    Correo electrónico
                                </label>

                                <Input
                                    type="email"
                                    placeholder="usuario@email.com"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="password">
                        {(field) => (
                            <div className="space-y-1">
                                <label className="block text-sm font-medium">
                                    Contraseña
                                </label>

                                <Input
                                    type="password"
                                    placeholder="********"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        )}
                    </form.Field>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading
                            ? "Ingresando..."
                            : "Ingresar"}
                    </Button>

                    <div className="mt-6 border-t pt-4">
                        <h2 className="mb-4 text-center text-sm font-semibold text-slate-700">
                            Usuarios de prueba
                        </h2>

                        <div className="space-y-4 text-center text-sm">
                            <div className="rounded-lg bg-slate-100 p-3">
                                <p className="font-semibold">
                                    Administrador
                                </p>

                                <p className="mt-1 text-slate-600">
                                    📧 admin@foodstore.com · 🔑 Admin1234!
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-100 p-3">
                                <p className="font-semibold">
                                    Usuario
                                </p>

                                <p className="mt-1 text-slate-600">
                                    📧 usuario@foodstore.com · 🔑 Usuario1234!
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;