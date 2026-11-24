import { useForm } from "@tanstack/react-form";
import type { RegisterData } from "../types/register";
import { register } from "../api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import FormError from "@/shared/ui/FormField";

const defaultValues: RegisterData = {
    username: "",
    full_name: "",
    email: "",
    password: "",
}

function RegisterPage() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm({
        defaultValues,

        onSubmit: async ({ value }) => {

            try {
                setIsLoading(true);

                await register(value);

                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        }
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Crear cuenta
                </h1>

                <p className="mb-6 text-center text-sm text-slate-500">
                    Ingresá los datos necesarios para crear tu cuenta.
                </p>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();

                        void form.handleSubmit();
                    }}
                >
                    <form.Field
                        name="username"
                        validators={{
                            onChange: ({ value }) =>
                                value.length > 0 &&
                                    value.trim().length < 3
                                    ? "Debe tener al menos 3 caracteres"
                                    : undefined,

                            onBlur: ({ value }) =>
                                !value.trim()
                                    ? "El nombre de usuario es obligatorio"
                                    : undefined,
                        }}>
                        {(field) => (
                            <div className="space-y-1">
                                <label className="block text-sm font-medium">
                                    Nombre de usuario
                                </label>

                                <Input
                                    type="text"
                                    placeholder="juanperez"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(
                                            e.target.value,
                                        )
                                    }
                                    onBlur={field.handleBlur}
                                />
                                <FormError
                                    errors={field.state.meta.errors}
                                />

                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="full_name"
                        validators={{
                            onChange: ({ value }) =>
                                value.length > 0 &&
                                    value.trim().length < 3
                                    ? "Debe tener al menos 3 caracteres"
                                    : undefined,

                            onBlur: ({ value }) =>
                                !value.trim()
                                    ? "El nombre completo es obligatorio"
                                    : undefined,
                        }}>
                        {(field) => (
                            <div className="space-y-1">
                                <label className="block text-sm font-medium">
                                    Nombre completo
                                </label>

                                <Input
                                    type="text"
                                    placeholder="Juan Pérez"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(
                                            e.target.value,
                                        )
                                    }
                                    onBlur={field.handleBlur}
                                />
                                <FormError
                                    errors={field.state.meta.errors}
                                />

                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="email"
                        validators={{
                            onChange: ({ value }) =>
                                value.length > 0 &&
                                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                    ? "Ingrese un correo válido"
                                    : undefined,

                            onBlur: ({ value }) =>
                                !value.trim()
                                    ? "El correo es obligatorio"
                                    : undefined,
                        }}>
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
                                    onBlur={field.handleBlur}
                                />
                                <FormError
                                    errors={field.state.meta.errors}
                                />

                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="password"
                        validators={{
                            onChange: ({ value }) =>
                                value.length > 0 &&
                                    value.length < 8
                                    ? "Debe tener al menos 8 caracteres"
                                    : undefined,

                            onBlur: ({ value }) =>
                                !value.trim()
                                    ? "La contraseña es obligatoria"
                                    : undefined,
                        }}>
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
                                    onBlur={field.handleBlur}
                                />
                                <FormError
                                    errors={field.state.meta.errors}
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
                            ? "Creando cuenta..."
                            : "Crear cuenta"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage