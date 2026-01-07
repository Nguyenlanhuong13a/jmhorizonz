"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/core/constants";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const { totalItems, isMounted: cartMounted } = useCart();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    if (!mounted) return null;

    const showBagCount = mounted && cartMounted;

    return (
        <>
            {/* Vertical Logo at Top-Left */}
            <Link 
                href="/" 
                className="fixed top-0 left-0 z-40 px-4 py-6 pointer-events-auto"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
                <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity">
                    J&M HORIZONZ
                </span>
            </Link>

            {/* Floating Control Center Widget - Bottom Right */}
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-2 border border-black bg-white/90 backdrop-blur-md text-black"
                >
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="font-mono text-xs uppercase tracking-widest text-black hover:opacity-60 transition-opacity"
                    >
                        MENU
                    </button>
                    <div className="w-px h-4 bg-black" />
                    <Link 
                        href="/cart" 
                        className="font-mono text-xs uppercase tracking-widest text-black hover:opacity-60 transition-opacity"
                    >
                        CART ({showBagCount ? totalItems : 0})
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Sheet Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 z-[998]"
                        />
                        
                        {/* Bottom Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black z-[999] max-h-[85vh] overflow-y-auto"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
                            }}
                        >
                            {/* Close Button */}
                            <div className="sticky top-0 bg-white border-b-2 border-black p-4 flex justify-between items-center">
                                <span className="font-mono text-xs uppercase tracking-widest text-black font-bold">
                                    NAVIGATION MENU
                                </span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-mono text-xs uppercase tracking-widest border-2 border-black px-4 py-2 bg-white text-black hover:bg-black hover:text-white transition-all"
                                >
                                    CLOSE [X]
                                </button>
                            </div>

                            {/* Receipt-Style Links */}
                            <div className="p-6 space-y-0 bg-white">
                                {/* Home Link */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0 }}
                                >
                                    <Link
                                        href="/"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-5 border-b border-dashed border-black font-mono text-base uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all"
                                    >
                                        HOME
                                    </Link>
                                </motion.div>
                                
                                {NAV_LINKS.map((link, index) => (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index + 1) * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block py-5 border-b border-dashed border-black font-mono text-base uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                {/* Auth Links */}
                                <div className="pt-4 border-t-2 border-black mt-4">
                                    {session ? (
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full py-5 border-b border-dashed border-black font-mono text-base uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all text-left"
                                        >
                                            LOGOUT
                                        </button>
                                    ) : (
                                        <Link
                                            href="/auth/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block py-5 border-b border-dashed border-black font-mono text-base uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all"
                                        >
                                            LOGIN
                                        </Link>
                                    )}
                                </div>

                                {/* Footer Info */}
                                <div className="pt-6 mt-4 border-t-2 border-black font-mono text-xs uppercase tracking-widest text-black opacity-60 space-y-1">
                                    <div>J&M HORIZONZ © 2026</div>
                                    <div>ALL RIGHTS RESERVED</div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
