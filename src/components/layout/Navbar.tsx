"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/core/constants";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Marquee } from "@/components/ui/Marquee";

export const Navbar = () => {
    const { totalItems, isMounted: cartMounted } = useCart();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mockIP, setMockIP] = useState("");
    const [mockCoords, setMockCoords] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        // Generate mock IP and coordinates for tech vibe
        setMockIP(`${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
        setMockCoords(`${(Math.random() * 180 - 90).toFixed(4)}°N, ${(Math.random() * 360 - 180).toFixed(4)}°E`);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Hydration fix: Return placeholder with matching height to prevent layout shift
    if (!mounted) {
        return (
            <nav className="sticky top-0 z-50 h-14 w-full bg-white text-black border-y border-black flex items-center">
                <div className="h-14 w-full" />
            </nav>
        );
    }

    const showBagCount = mounted && cartMounted;

    return (
        <>
            {/* Desktop: System Status Bar */}
            <nav className="sticky top-0 z-50 h-14 w-full bg-white text-black border-y border-black hidden lg:flex items-center">
                {/* Left: Brand Logo */}
                <div className="flex items-center px-4 border-r border-black flex-shrink-0">
                    <Link href="/" className="font-mono text-xs font-bold tracking-tighter hover:invert transition-all">
                        J&M HORIZONZ
                    </Link>
                </div>

                {/* Center: Marquee */}
                <div className="flex-1 overflow-hidden border-r border-black">
                    <Marquee />
                </div>

                {/* Right: Cart & Login */}
                <div className="flex items-center px-4">
                    <Link 
                        href="/cart" 
                        className="px-3 py-1 border border-black bg-white text-black font-mono text-xs uppercase hover:invert transition-all"
                    >
                        CART [{showBagCount ? totalItems : 0}]
                    </Link>
                    {session ? (
                        <button 
                            onClick={() => signOut()} 
                            className="ml-2 px-3 py-1 border border-black bg-white text-black font-mono text-xs uppercase hover:invert transition-all"
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <Link 
                            href="/auth/login" 
                            className="ml-2 px-3 py-1 border border-black bg-white text-black font-mono text-xs uppercase hover:invert transition-all"
                        >
                            LOGIN
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile: Menu Button */}
            <nav className="sticky top-0 z-50 h-14 w-full bg-white text-black border-y border-black flex lg:hidden items-center justify-between px-4">
                <Link href="/" className="font-mono text-xs font-bold tracking-tighter">
                    J&M HORIZONZ
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="font-mono text-xs uppercase border border-black px-3 py-1 hover:invert transition-all"
                    aria-label="Open menu"
                >
                    MENU [ + ]
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-white z-[999]"
                    >
                        {/* Close Button */}
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-mono text-xs uppercase border border-black px-3 py-1 hover:invert transition-all"
                                aria-label="Close menu"
                            >
                                CLOSE [ X ]
                            </button>
                        </div>

                        {/* Mobile Navigation Links - Left Aligned */}
                        <div className="flex flex-col items-start justify-center h-full px-6">
                            {NAV_LINKS.map((link, index) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    className="mb-4"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="font-heading uppercase tracking-tighter leading-[0.8] block"
                                        style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Footer: Mock IP and Coordinates */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: NAV_LINKS.length * 0.1,
                                    ease: "easeOut"
                                }}
                                className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest opacity-60"
                            >
                                <div>IP: {mockIP}</div>
                                <div>COORDS: {mockCoords}</div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
