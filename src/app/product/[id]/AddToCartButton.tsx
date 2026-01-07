"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

interface AddToCartButtonProps {
    product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    const { addItem, isMounted } = useCart();

    return (
        <button
            onClick={() => addItem(product)}
            disabled={!isMounted}
            className="w-full py-6 bg-black text-white font-mono text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isMounted ? 'Deploy to Bag — AR-01' : 'Initializing...'}
        </button>
    );
};
