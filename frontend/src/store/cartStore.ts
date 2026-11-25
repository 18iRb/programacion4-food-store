import type { Product } from "@/features/productos/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    producto_id: Product["id"];

    nombre: string;

    precio_unitario: Product["precio_base"];

    cantidad: number;
}

interface CartStoreState {
    items: CartItem[];

    addItem: (product: Product) => void;

    removeItem: (productId: Product["id"]) => void;

    updateQuantity: (
        productId: Product["id"],
        quantity: number,
    ) => void;

    clearCart: () => void;

    getTotal: () => number;
}

export const useCartStore =
    create<CartStoreState>()(
        persist(
            (set, get) => ({
                items: [],

                addItem: (product: Product) => {
                    const items = get().items;

                    const itemExists = items.some((item, idx, arr) => {
                        return item.producto_id === product.id
                    })

                    if (!itemExists) {
                        const newItem = {
                            producto_id: product.id,
                            nombre: product.nombre,
                            precio_unitario: product.precio_base,
                            cantidad: 1,
                        }

                        set({
                            items: [
                                ...items,
                                newItem
                            ]
                        })
                    } else {

                        set({
                            items: items.map((i) =>
                                i.producto_id === product.id
                                    ? {
                                        ...i,
                                        cantidad:
                                            i.cantidad + 1,
                                    }
                                    : i,
                            ),
                        })
                    }
                },

                removeItem: () => { },

                updateQuantity: () => { },

                clearCart: () => { },

                getTotal: () => 0,
            }),
            {
                name: "cart-storage",
            },
        ),
    );