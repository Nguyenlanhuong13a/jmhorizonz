"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { items, removeItem, updateQuantity, subtotal, isMounted } = useCart();
    const router = useRouter();
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalStatus, setTerminalStatus] = useState<'idle' | 'processing' | 'complete'>('idle');

    // Hydration guard
    if (!isMounted) {
        return (
            <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 border-2 border-black border-t-transparent animate-spin" style={{ borderRadius: 0 }} />
            </main>
        );
    }

    const taxes = subtotal * 0.08;
    const shipping = subtotal > 0 ? 25 : 0;
    const total = subtotal + taxes + shipping;

    const handleCheckout = async () => {
        setShowTerminal(true);
        setTerminalStatus('processing');
        
        // Simulate terminal processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setTerminalStatus('complete');
        
        // Redirect after showing success
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <main className="flex-grow flex flex-col items-center justify-center p-6 text-center min-h-[80vh]">
                <h1 
                    className="font-heading uppercase tracking-tighter mb-8 opacity-20"
                    style={{ fontSize: 'clamp(6rem, 25vw, 20rem)' }}
                >
                    VOID
                </h1>
                <Link 
                    href="/shop" 
                    className="border-2 border-black px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:invert transition-all"
                >
                    RETURN TO SHOP
                </Link>
            </main>
        );
    }

    return (
        <main className="flex-grow pt-24 px-6 md:px-12 pb-24 bg-white text-black">
            <h1 className="font-heading uppercase tracking-tighter mb-12 text-black" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>Shopping Bag</h1>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Cart Items */}
                <div className="flex-1 space-y-12">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-8 border-b-2 border-black pb-12 last:border-0 hover:bg-neutral-50 transition-colors p-4 -mx-4">
                            <div className="relative w-32 h-40 bg-neutral-100 flex-shrink-0 border border-black">
                                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-heading uppercase mb-1 text-black">{item.name}</h3>
                                        <p className="font-mono text-xs uppercase text-black opacity-60">{item.category} — ID: {item.id}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <X size={16} className="text-black" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border-2 border-black p-1 bg-white">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={12} className="text-black" />
                                        </button>
                                        <span className="w-12 text-center font-mono text-sm font-bold text-black">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={12} className="text-black" />
                                        </button>
                                    </div>
                                    <p className="font-mono text-xl font-bold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="w-full lg:w-96">
                    <div className="border-2 border-black p-8 bg-white space-y-6 sticky top-24">
                        <h2 className="text-2xl font-heading uppercase mb-8 text-black">Summary</h2>

                        <div className="space-y-4 border-b-2 border-black pb-6">
                            <div className="flex justify-between font-mono text-sm uppercase text-black">
                                <span className="opacity-60">Subtotal</span>
                                <span className="font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-mono text-sm uppercase text-black">
                                <span className="opacity-60">Taxes (8%)</span>
                                <span className="font-bold">${taxes.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-mono text-sm uppercase text-black">
                                <span className="opacity-60">Shipping</span>
                                <span className="font-bold">${shipping.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-mono text-2xl font-bold text-black border-t-2 border-black pt-4">
                            <span>TOTAL</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button 
                            onClick={handleCheckout}
                            disabled={showTerminal}
                            className={`w-full py-6 bg-black text-white font-mono text-sm uppercase tracking-[0.2em] transition-opacity mt-8 ${
                                showTerminal 
                                    ? 'opacity-60 cursor-not-allowed' 
                                    : 'hover:opacity-80'
                            }`}
                        >
                            PROCEED TO CHECKOUT — AR-01
                        </button>

                        <p className="text-xs font-mono uppercase tracking-widest text-black opacity-60 text-center mt-4">
                            Transaction secured via encrypted node.
                        </p>
                    </div>
                </div>
            </div>

            {/* Terminal-Style Popup */}
            <AnimatePresence>
                {showTerminal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-6"
                        onClick={() => terminalStatus === 'complete' && setShowTerminal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-black border-2 border-white p-8 max-w-md w-full"
                        >
                            <div className="font-mono text-white text-sm space-y-2">
                                <div className="text-green-400">$ INITIATING_TRANSACTION...</div>
                                {terminalStatus === 'processing' && (
                                    <div className="text-yellow-400 animate-pulse">$ PROCESSING_PAYMENT_PROTOCOL</div>
                                )}
                                {terminalStatus === 'complete' && (
                                    <>
                                        <div className="text-green-400">$ TRANSACTION_APPROVED [OK]</div>
                                        <div className="text-white mt-4 pt-4 border-t border-white/20">
                                            <div>Redirecting to checkout...</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
