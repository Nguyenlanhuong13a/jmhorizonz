"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, X } from "lucide-react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, subtotal, isMounted } = useCart();

    // Hydration guard
    if (!isMounted) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </main>
        );
    }

    const taxes = subtotal * 0.08;
    const shipping = subtotal > 0 ? 25 : 0;
    const total = subtotal + taxes + shipping;

    if (items.length === 0) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-heading uppercase mb-8">Your Bag is Empty</h1>
                <Link href="/shop" className="border border-black px-8 py-4 bg-black text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    Back to Shop
                </Link>
            </main>
        );
    }

    return (
        <main className="pt-24 px-6 md:px-12 pb-24">
            <h1 className="text-[4vw] font-heading uppercase tracking-tighter mb-12">Shopping Bag</h1>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Cart Items */}
                <div className="flex-1 space-y-12">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-8 border-b border-black/10 pb-12 last:border-0 hover:bg-neutral-50/50 transition-colors p-4 -mx-4">
                            <div className="relative w-32 h-40 bg-neutral-100 flex-shrink-0">
                                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-heading uppercase mb-1">{item.name}</h3>
                                        <p className="font-mono text-[10px] uppercase opacity-40">{item.category} — ID: {item.id}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 hover:bg-black hover:text-white transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border border-black p-1 bg-white">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="w-12 text-center font-mono text-xs">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                    <p className="font-mono text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="w-full lg:w-96">
                    <div className="border border-black p-8 bg-neutral-50 space-y-6 sticky top-24">
                        <h2 className="text-2xl font-heading uppercase mb-8">Summary</h2>

                        <div className="space-y-4 border-b border-black/10 pb-6">
                            <div className="flex justify-between font-mono text-[10px] uppercase">
                                <span className="opacity-40">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-mono text-[10px] uppercase">
                                <span className="opacity-40">Taxes (8%)</span>
                                <span>${taxes.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-mono text-[10px] uppercase">
                                <span className="opacity-40">Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-mono text-xl font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="w-full py-6 bg-black text-white font-mono text-sm uppercase tracking-[0.2em] hover:opacity-80 transition-opacity mt-8">
                            Proceed to Checkout — AR-01
                        </button>

                        <p className="text-[8px] font-mono uppercase tracking-widest opacity-40 text-center">
                            Transaction secured via encrypted node.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
