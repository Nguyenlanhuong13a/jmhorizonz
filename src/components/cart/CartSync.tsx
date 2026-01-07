"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { syncCart, getDBCart } from "@/lib/actions/cart";
import { Product } from "@/types";

interface DBCartItem {
    product: Product;
    quantity: number;
}

export const CartSync = () => {
    const { data: session, status } = useSession();
    const { items, clearCart, addItem, updateQuantity } = useCartStore();
    const isSyncing = useRef(false);
    const hasInitialSynced = useRef(false);

    // Initial Sync from DB when user logs in
    useEffect(() => {
        const performInitialSync = async () => {
            if (status === "authenticated" && !hasInitialSynced.current) {
                const dbItems = await getDBCart();

                // For this protocol: Merge local into DB if local exists, else fetch DB.
                // We'll iterate over local items and sync them to DB.
                // Then fetch the full cart from DB.

                if (items.length > 0) {
                    await syncCart(items.map(i => ({ productId: i.id, quantity: i.quantity })));
                }

                const updatedDbCart = await getDBCart();

                // Clear local store and repopulate from DB to ensure consistency
                clearCart();
                (updatedDbCart as DBCartItem[]).forEach(dbItem => {
                    addItem(dbItem.product);
                    updateQuantity(dbItem.product.id, dbItem.quantity);
                });

                hasInitialSynced.current = true;
            }
        };

        performInitialSync();
    }, [status, addItem, updateQuantity, clearCart, items]);

    // Sync to DB whenever local items change
    useEffect(() => {
        const debouncedSync = setTimeout(async () => {
            if (status === "authenticated" && items.length >= 0 && !isSyncing.current) {
                isSyncing.current = true;
                await syncCart(items.map(i => ({ productId: i.id, quantity: i.quantity })));
                isSyncing.current = false;
            }
        }, 2000); // Debounce sync to avoid excessive DB writes

        return () => clearTimeout(debouncedSync);
    }, [items, status]);

    return null; // Invisible component
};
