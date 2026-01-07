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
    const [isMounted, setIsMounted] = useState(false);

    // Persistence check & Hydration safety
    useEffect(() => {
        // Satisfy strict React rules by allowing the first render to complete
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    const value: CartContextType = {
        items: cartStore.items,
        addItem: cartStore.addItem,
        removeItem: cartStore.removeItem,
        updateQuantity: cartStore.updateQuantity,
        clearCart: cartStore.clearCart,
        subtotal: cartStore.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        totalItems: cartStore.items.reduce((acc, item) => acc + item.quantity, 0),
        isMounted
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
