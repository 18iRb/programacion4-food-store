import { useMemo, useState } from "react";

import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

function CatalogoPage() {
    const {
        data,
        isLoading,
        error,
    } = useProducts();

    const [selectedCategory, setSelectedCategory] =
        useState("Todos");

    const categories = useMemo(() => {
        if (!data) return ["Todos"];

        return [
            "Todos",
            ...new Set(
                data.items.map(
                    (product) =>
                        product.categoria.nombre,
                ),
            ),
        ];
    }, [data]);

    const filteredProducts = useMemo(() => {
        if (!data) return [];

        if (selectedCategory === "Todos") {
            return data.items;
        }

        return data.items.filter(
            (product) =>
                product.categoria.nombre ===
                selectedCategory,
        );
    }, [data, selectedCategory]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div
            className="mx-auto max-w-7xl p-6"
        >
            <div className="mb-6 flex items-center gap-3">
                <h1 className="text-3xl font-bold">
                    Catálogo
                </h1>

                <span
                    className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700"
                >
                    {filteredProducts.length} productos
                </span>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() =>
                            setSelectedCategory(
                                category,
                            )
                        }
                        className={
                            selectedCategory ===
                                category
                                ? `rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white cursor-pointer`
                                : `rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-300`
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {filteredProducts.map(
                    (product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ),
                )}
            </div>
        </div>
    );
}

export default CatalogoPage;