import { useForm } from "@tanstack/react-form";

import type { Category } from "../types/category";
import Input from "@/shared/ui/Input";
import FormError from "@/shared/ui/FormField";
import Button from "@/shared/ui/Button";

type CategoryFormProps = {
    initialValues?: Partial<Category>;
    onSubmit: (data: {
        nombre: string;
        descripcion: string;
    }) => Promise<void>;
};

export function CategoryForm({
    initialValues,
    onSubmit,
}: CategoryFormProps) {
    const form = useForm({
        defaultValues: {
            nombre:
                initialValues?.nombre ?? "",
            descripcion:
                initialValues?.descripcion ?? "",
        },

        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    return (
        <form
            className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit();
            }}
        >
            <form.Field
                name="nombre"
                validators={{
                    onBlur: ({ value }) =>
                        !value.trim()
                            ? "El nombre es obligatorio"
                            : undefined,
                }}
            >
                {(field) => (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Nombre
                        </label>

                        <Input
                            type="text"
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
                name="descripcion"
                validators={{
                    onBlur: ({ value }) =>
                        !value.trim()
                            ? "La descripción es obligatoria"
                            : undefined,
                }}
            >
                {(field) => (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Descripción
                        </label>

                        <textarea
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange(
                                    e.target.value,
                                )
                            }
                            onBlur={field.handleBlur}
                            rows={4}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        <FormError
                            errors={field.state.meta.errors}
                        />
                    </div>
                )}
            </form.Field>

            <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
            >
                Guardar
            </Button>
        </form>
    );
}