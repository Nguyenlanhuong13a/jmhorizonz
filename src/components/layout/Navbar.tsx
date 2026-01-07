"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/core/constants";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const { totalItems, isMounted: cartMounted } = useCart();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Hydration fix: Return placeholder with matching height to prevent layout shift
    if (!mounted) {
        return (
            <nav className="sticky top-0 z-50 min-h-[100px] w-full bg-[#000] text-white border-b-2 border-white flex items-stretch py-10">
                <div className="h-8 w-full" />
            </nav>
        );
    }

    const showBagCount = mounted && cartMounted;

    return (
        <>
            <nav className="sticky top-0 z-50 min-h-[100px] w-full bg-[#000] text-white border-b-2 border-white flex items-stretch py-10">
                {/* Left: Brand Logo */}
                <div className="flex items-center px-4 md:px-8 border-r border-white flex-shrink-0">
                    <Link href="/" className="font-heading text-2xl md:text-4xl font-black tracking-tighter hover:text-white/80 transition-colors">
                        J&M HORIZONZ
                    </Link>
                </div>

                {/* Center: Desktop Navigation - Hidden on mobile */}
                <div className="flex-1 hidden md:flex items-center justify-center space-x-12 border-r border-white">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-base font-mono uppercase tracking-[0.3em] hover:text-white/60 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right: Icons & Mobile Menu Button */}
                <div className="flex items-center px-4 md:px-8 space-x-4 md:space-x-8">
                    {/* Desktop Icons - Hidden on mobile */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/profile" className="hover:text-white/60 transition-colors">
                            <User size={24} strokeWidth={2} />
                        </Link>
                        <button onClick={() => signOut()} className='text-xs font-mono border border-white px-2 py-1 hover:text-red-500 transition-colors'>LOGOUT</button>
                        <div className="h-full w-[1px] bg-white mx-4" />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative group flex items-center space-x-2"
                        >
                            <Link href="/cart" className="flex items-center space-x-2">
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                >
                                    <ShoppingBag size={24} strokeWidth={2} className="group-hover:text-white/60 transition-colors" />
                                </motion.div>
                                <span className="text-sm font-mono tracking-widest">
                                    ({showBagCount ? totalItems : 0})
                                </span>
                            </Link>
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button - Visible only on mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden hover:text-white/60 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu size={24} strokeWidth={2} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black"
                    >
                        {/* Close Button */}
                        <div className="absolute top-6 right-6 z-10">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-white/60 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={32} strokeWidth={2} />
                            </button>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col items-center justify-center h-full px-6">
                            {NAV_LINKS.map((link, index) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    className="mb-8"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-4xl font-heading uppercase tracking-tighter hover:text-white/60 transition-colors block text-center"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Icons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.4,
                                    delay: NAV_LINKS.length * 0.1,
                                    ease: "easeOut"
                                }}
                                className="flex items-center space-x-8 mt-12 pt-12 border-t border-white border-opacity-30"
                            >
                                <Link href="/profile" className="hover:text-white/60 transition-colors">
                                    <User size={24} strokeWidth={2} />
                                </Link>
                                <Link href="/cart" className="flex items-center space-x-2 hover:text-white/60 transition-colors">
                                    <ShoppingBag size={24} strokeWidth={2} />
                                    <span className="text-sm font-mono tracking-widest">
                                        ({showBagCount ? totalItems : 0})
                                    </span>
                                </Link>
                                <button onClick={() => {
                                    signOut();
                                    setIsMobileMenuOpen(false);
                                }} className='text-xs font-mono border border-white px-2 py-1 hover:text-red-500 transition-colors'>
                                    LOGOUT
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
