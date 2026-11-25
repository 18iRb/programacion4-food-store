import { Link } from "react-router-dom";

import { useCartStore } from "@/store/cartStore";

function CarritoPage() {
    const items = useCartStore(
        (s) => s.items,
    );

    const total = useCartStore(
        (s) => s.getTotal(),
    );

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
                                Acciones
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
                                    {item.cantidad}
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
                                    Próximamente
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CarritoPage;