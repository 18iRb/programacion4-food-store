import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";
import { useCartStore } from "@/store/cartStore";

function ProductDetailPage() {
    const { id } = useParams();

    const addItem = useCartStore(
        (s) => s.addItem,
    );

    const {
        data: product,
        isLoading,
        error,
    } = useProduct(Number(id));

    if (isLoading) {
        return (
            <div className="p-6">
                Cargando producto...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="p-6">
                Producto no encontrado.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl p-6">
            <div
                className="grid gap-8 rounded-xl bg-white p-6 shadow md:grid-cols-2"
            >
                <div
                    className="flex h-80 items-center justify-center rounded-lg bg-slate-100 text-8xl"
                >
                    {product.imagen_url
                        ? (
                            <img
                                src={product.imagen_url}
                                alt={product.nombre}
                                className="h-full w-full rounded-lg object-cover"
                            />
                        )
                        : "🍔"}
                </div>

                <div className="flex flex-col">
                    <span
                        className="mb-2 w-fit rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700"
                    >
                        {product.categoria.nombre}
                    </span>

                    <h1
                        className="text-3xl font-bold"
                    >
                        {product.nombre}
                    </h1>

                    <p
                        className="mt-4 text-slate-600"
                    >
                        {product.descripcion}
                    </p>

                    <div className="mt-6 space-y-2">
                        <p
                            className="text-4xl font-bold text-orange-600"
                        >
                            $
                            {product.precio_base.toLocaleString(
                                "es-AR",
                            )}
                        </p>

                        <p>
                            Stock disponible:
                            {" "}
                            {product.stock}
                        </p>

                        <p>
                            Categoría:
                            {" "}
                            {product.categoria.nombre}
                        </p>
                    </div>

                    <button
                        className="mt-6 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                        onClick={() => addItem(product)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;