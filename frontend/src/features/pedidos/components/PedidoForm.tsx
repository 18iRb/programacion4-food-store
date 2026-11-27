import { useForm } from "@tanstack/react-form";

import Button from "@/shared/ui/Button";
import FormError from "@/shared/ui/FormField";
import Input from "@/shared/ui/Input";

import type {
    FormaPago,
} from "../types/pedido";

type PedidoFormProps = {
    onSubmit: (
        data: {
            forma_pago: FormaPago;
            direccion_entrega: string;
            notas: string | null;
        }) => Promise<void>;
};

export function PedidoForm({
    onSubmit,
}: PedidoFormProps) {
    const form = useForm({
        defaultValues: {
            forma_pago: "EFECTIVO" as FormaPago,
            direccion_entrega: "",
            notas: "",
        },

        onSubmit: async ({
            value,
        }) => {
            await onSubmit({
                forma_pago:
                    value.forma_pago,

                direccion_entrega:
                    value.direccion_entrega,

                notas:
                    value.notas.trim()
                        ? value.notas
                        : null,
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
            <form.Field name="forma_pago">
                {(field) => (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Forma de pago
                        </label>

                        <select
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange(
                                    e.target
                                        .value as FormaPago,
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                            <option value="EFECTIVO">
                                Efectivo
                            </option>

                            <option value="TRANSFERENCIA">
                                Transferencia
                            </option>
                        </select>
                    </div>
                )}
            </form.Field>

            <form.Field
                name="direccion_entrega"
                validators={{
                    onBlur: ({
                        value,
                    }) =>
                        value.trim()
                            .length < 5
                            ? "La dirección debe tener al menos 5 caracteres"
                            : undefined,
                }}
            >
                {(field) => (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Dirección de entrega
                        </label>

                        <Input
                            value={
                                field.state.value
                            }
                            onChange={(e) =>
                                field.handleChange(
                                    e.target.value,
                                )
                            }
                            onBlur={
                                field.handleBlur
                            }
                            placeholder="Av. Siempre Viva 742"
                        />

                        <FormError
                            errors={
                                field.state.meta
                                    .errors
                            }
                        />
                    </div>
                )}
            </form.Field>

            <form.Field name="notas">
                {(field) => (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Notas
                            (opcional)
                        </label>

                        <textarea
                            rows={3}
                            value={
                                field.state.value
                            }
                            onChange={(e) =>
                                field.handleChange(
                                    e.target.value,
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Sin cebolla, tocar timbre, etc."
                        />
                    </div>
                )}
            </form.Field>

            <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
            >
                Confirmar pedido
            </Button>
        </form>
    );
}