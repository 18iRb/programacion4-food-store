import { useForm } from "@tanstack/react-form";
import type { ProductCreate } from "../types/product";
import { useCategories } from "@/features/categorias/hooks/useCategories";
import Input from "@/shared/ui/Input";
import FormError from "@/shared/ui/FormField";
import Button from "@/shared/ui/Button";


type ProductFormProps = {
    initialValues?: Partial<ProductCreate>;

    onSubmit: (
        data: ProductCreate,
    ) => Promise<void>;
};

export function ProductForm({
    initialValues,
    onSubmit,
}: ProductFormProps) {

    const {
        data: categoriesData,
    } = useCategories();

    const form = useForm({
        defaultValues: {
            nombre:
                initialValues?.nombre ?? "",

            descripcion:
                initialValues?.descripcion ?? "",

            precio_base:
                initialValues?.precio_base ?? 0,

            imagen_url:
                initialValues?.imagen_url ?? "",

            stock:
                initialValues?.stock ?? 0,

            disponible:
                initialValues?.disponible ?? true,

            categoria_id:
                initialValues?.categoria_id ?? 0,
        },

        onSubmit: async ({
            value,
        }) => {
            await onSubmit({
                ...value,
                descripcion:
                    value.descripcion || null,

                imagen_url:
                    value.imagen_url || null,
            });
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
                    <div>
                        <label className="mb-1 block text-sm font-medium">
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

            <form.Field name="descripcion">
                {(field) => (
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Descripción
                        </label>

                        <textarea
                            rows={3}
                            value={field.state.value ?? ""}
                            onChange={(e) =>
                                field.handleChange(
                                    e.target.value,
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                )}
            </form.Field>

            <form.Field
                name="precio_base"
                validators={{
                    onBlur: ({ value }) =>
                        value <= 0
                            ? "El precio debe ser mayor a 0"
                            : undefined,
                }}
            >

                {(field) => (
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Precio
                        </label>

                        <Input
                            type="number"
                            min={0}
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange(
                                    Number(
                                        e.target.value,
                                    ),
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
                name="stock"
                validators={{
                    onBlur: ({ value }) =>
                        value < 0
                            ? "El stock no puede ser negativo"
                            : undefined,
                }}>
                {(field) => (
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Stock
                        </label>

                        <Input
                            type="number"
                            min={0}
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange(
                                    Number(
                                        e.target.value,
                                    ),
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

            <form.Field name="imagen_url">
                {(field) => (
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            URL Imagen
                        </label>

                        <Input
                            type="text"
                            value={field.state.value ?? ""}
                            onChange={(e) =>
                                field.handleChange(
                                    e.target.value,
                                )
                            }
                        />

                    </div>
                )}
            </form.Field>

            <form.Field
                name="categoria_id"
                validators={{
                    onBlur: ({ value }) =>
                        value <= 0
                            ? "Debe seleccionar una categoría"
                            : undefined,
                }}
            >

                {(field) => (
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Categoría
                        </label>

                        <select
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange(
                                    Number(
                                        e.target.value,
                                    ),
                                )
                            }
                            className="w-full rounded-lg border p-2"
                        >
                            <option value={0}>
                                Seleccionar categoría
                            </option>

                            {categoriesData?.map(
                                (category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.nombre}
                                    </option>
                                ),
                            )}
                        </select>
                        <FormError
                            errors={field.state.meta.errors}
                        />
                    </div>
                )}
            </form.Field>

            <form.Field name="disponible">
                {(field) => (
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={
                                field.state.value
                            }
                            onChange={(e) =>
                                field.handleChange(
                                    e.target.checked,
                                )
                            }
                        />

                        Disponible
                    </label>
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