import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    const updatedItems = currentItems.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                    set({ items: updatedItems });
                } else {
                    set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((item) => item.id !== productId) });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                const updatedItems = get().items.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                );
                set({ items: updatedItems });
            },
            clearCart: () => set({ items: [] }),
            get subtotal() {
                return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },
            get totalItems() {
                return get().items.reduce((acc, item) => acc + item.quantity, 0);
            },
        }),
        {
            name: 'jm-horizonz-cart',
            storage: {
                getItem: (name) => {
                    if (typeof window === 'undefined') return null;
                    const str = localStorage.getItem(name);
                    return str ? JSON.parse(str) : null;
                },
                setItem: (name, value) => {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(name, JSON.stringify(value));
                    }
                },
                removeItem: (name) => {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(name);
                    }
                },
            }
        }
    )
);
