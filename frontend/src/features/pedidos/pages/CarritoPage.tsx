import { Link } from "react-router-dom";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Modal } from "@/shared/ui/Modal";
import { PedidoForm } from "../components/PedidoForm";
import { useCreateOrder } from "../hooks/useCreateOrder";

function CarritoPage() {
    const [
        isPedidoModalOpen,
        setIsPedidoModalOpen,
    ] = useState(false);

    const items = useCartStore(
        (s) => s.items,
    );

    const removeItem = useCartStore(
        (s) => s.removeItem,
    );

    const increaseQuantity = useCartStore(
        (s) => s.increaseQuantity,
    );

    const decreaseQuantity = useCartStore(
        (s) => s.decreaseQuantity,
    );

    const clearCart = useCartStore(
        (s) => s.clearCart,
    );

    const total = useCartStore(
        (s) => s.getTotal(),
    );

    const createOrderMutation =
        useCreateOrder();

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-5xl p-6">
                <h1 className="mb-6 text-3xl font-bold">
                    Mi carrito
                </h1>

                <div
                    className="rounded-xl border bg-white p-8 text-center"
                >
                    <p className="mb-4 text-slate-600">
                        Tu carrito está vacío.
                    </p>

                    <Link
                        to="/"
                        className="inline-block rounded-lg bg-orange-600 px-6 py-3 text-white"
                    >
                        Ir al catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Mi carrito
                </h1>

                <button
                    onClick={clearCart}
                    className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                    Vaciar carrito
                </button>

                <button
                    onClick={() => setIsPedidoModalOpen(true)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                    Confirmar pedido
                </button>

                <p className="text-2xl font-bold text-orange-600">
                    Total: ${total.toLocaleString("es-AR")}
                </p>
            </div>


            <div
                className="overflow-hidden rounded-xl border bg-white"
            >
                <table className="w-full">
                    <thead>
                        <tr
                            className="border-b bg-slate-50 text-left"
                        >
                            <th className="p-4">
                                Producto
                            </th>

                            <th className="p-4">
                                Precio
                            </th>

                            <th className="p-4">
                                Cantidad
                            </th>

                            <th className="p-4">
                                Subtotal
                            </th>

                            <th className="p-4">
                                Eliminar
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={
                                    item.producto_id
                                }
                                className="border-b"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100"
                                        >
                                            🍔
                                        </div>

                                        <span>
                                            {item.nombre}
                                        </span>
                                    </div>
                                </td>

                                <td className="p-4">
                                    $
                                    {item.precio_unitario.toLocaleString(
                                        "es-AR",
                                    )}
                                </td>

                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.producto_id,
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded border hover:bg-slate-100"
                                        >
                                            -
                                        </button>

                                        <span className="min-w-6 text-center">
                                            {item.cantidad}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.producto_id,
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded border hover:bg-slate-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>

                                <td className="p-4 font-medium">
                                    $
                                    {(
                                        item.precio_unitario *
                                        item.cantidad
                                    ).toLocaleString(
                                        "es-AR",
                                    )}
                                </td>

                                <td className="p-4">
                                    <button
                                        onClick={() =>
                                            removeItem(
                                                item.producto_id,
                                            )
                                        }
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        🗑
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal
                    isOpen={isPedidoModalOpen}
                    onClose={() =>
                        setIsPedidoModalOpen(false)
                    }
                    title="Confirmar pedido"
                >
                    <PedidoForm
                        onSubmit={async (data) => {

                            const payload = {
                                items: items.map(
                                    (item) => ({
                                        producto_id:
                                            item.producto_id,

                                        cantidad:
                                            item.cantidad,
                                    }),
                                ),

                                forma_pago:
                                    data.forma_pago,

                                direccion_entrega:
                                    data.direccion_entrega,

                                notas:
                                    data.notas,
                            };

                            await createOrderMutation.mutateAsync(
                                payload,
                            );

                            clearCart();

                            setIsPedidoModalOpen(
                                false,
                            );
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default CarritoPage;