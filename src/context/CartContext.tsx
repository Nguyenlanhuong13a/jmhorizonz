"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { CartItem, Product } from '@/types';

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
    isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cartStore = useCartStore();
    const [hasMounted, setHasMounted] = useState(false);

    // Persistence check & Hydration safety
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const value: CartContextType = {
        items: hasMounted ? cartStore.items : [],
        addItem: cartStore.addItem,
        removeItem: cartStore.removeItem,
        updateQuantity: cartStore.updateQuantity,
        clearCart: cartStore.clearCart,
        subtotal: hasMounted ? cartStore.items.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0,
        totalItems: hasMounted ? cartStore.items.reduce((acc, item) => acc + item.quantity, 0) : 0,
        isMounted: hasMounted
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
