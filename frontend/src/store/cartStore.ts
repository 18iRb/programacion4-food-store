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

    addItem: (
        product: Product,
        quantity?: number,
    ) => void;

    removeItem: (productId: Product["id"]) => void;

    increaseQuantity: (
        productId: Product["id"]
    ) => void;

    decreaseQuantity: (
        productId: Product["id"]
    ) => void;

    clearCart: () => void;

    getTotal: () => number;
}

export const useCartStore =
    create<CartStoreState>()(
        persist(
            (set, get) => ({
                items: [],

                addItem: (
                    product: Product,
                    quantity = 1,
                ) => {
                    const items = get().items;

                    const itemExists = items.some((item, idx, arr) => {
                        return item.producto_id === product.id
                    })

                    if (!itemExists) {
                        const newItem = {
                            producto_id: product.id,
                            nombre: product.nombre,
                            precio_unitario: product.precio_base,
                            cantidad: quantity,
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
                                            i.cantidad + quantity,
                                    }
                                    : i,
                            ),
                        })
                    }
                },

                removeItem: (productId: Product["id"]) => {
                    const items = get().items;

                    const itemsUpdate = items.filter((item) => item.producto_id != productId)

                    set({
                        items: itemsUpdate,
                    })
                },

                increaseQuantity: (productId: Product["id"]) => {
                    const items = get().items;

                    set({
                        items: items.map((item) => item.producto_id === productId ? { ...item, cantidad: item.cantidad + 1 } : item)
                    })
                },

                decreaseQuantity: (productId: Product["id"]) => {
                    const items = get().items;
                    const item = items.find((item) => item.producto_id === productId);

                    if (!item || item.cantidad <= 0) {
                        return;
                    }

                    if (item.cantidad === 1) {
                        get().removeItem(item.producto_id);
                        return;
                    }

                    set({
                        items: items.map((current) =>
                            current.producto_id === productId
                                ? { ...current, cantidad: current.cantidad - 1 }
                                : current
                        ),
                    });
                },

                clearCart: () => {
                    set({
                        items: [],
                    });
                },

                getTotal: () => {
                    const items = get().items;

                    const total = items.reduce((acc, cur) => acc + cur.precio_unitario * cur.cantidad, 0)

                    return total;
                },
            }),
            {
                name: "cart-storage",
            },
        ),
    );