import Button from "@/shared/ui/Button";

import type { Product } from "../types/product";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    product: Product;
}

function ProductCard({
    product,
}: ProductCardProps) {

    const addItem = useCartStore((s) => s.addItem);

    return (
        <article
            className="flex flex-col rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
            <div
                className="mb-4 flex h-40 items-center justify-center rounded-lg bg-slate-100 text-5xl"
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

            <span
                className="mb-2 w-fit rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700"
            >
                {product.categoria.nombre}
            </span>

            <h2
                className="text-lg font-semibold text-slate-800"
            >
                {product.nombre}
            </h2>

            <p
                className="mt-2 flex-1 text-sm  text-slate-600"
            >
                {product.descripcion}
            </p>

            <div className="mt-4 space-y-2">
                <p
                    className="text-2xl font-bold text-orange-600"
                >
                    ${product.precio_base.toLocaleString("es-AR")}
                </p>

                <p
                    className="
                        text-sm
                        text-slate-500
                    "
                >
                    Stock: {product.stock}
                </p>

                <Link
                    to={`/productos/${product.id}`}
                    className="block rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                    Ver detalle
                </Link>


                <Button
                    className="w-full"
                    onClick={() => addItem(product)}
                >
                    Agregar al carrito
                </Button>
            </div>
        </article>
    );
}

export default ProductCard;