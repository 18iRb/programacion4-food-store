import { useForm } from "@tanstack/react-form";

import type { Category } from "../types/category";

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

                        <input
                            type="text"
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange(
                                    e.target.value,
                                )
                            }
                            onBlur={field.handleBlur}
                            className="w-full rounded-lg border p-2"
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
                            className="w-full rounded-lg border p-2"
                        />
                    </div>
                )}
            </form.Field>

            <button
                type="submit"
                className="w-full rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
            >
                Guardar
            </button>
        </form>
    );
}