"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, User } from "lucide-react";
import { NAV_LINKS } from "@/core/constants";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const { totalItems, isMounted: cartMounted } = useCart();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Hydration fix: Return placeholder with matching height to prevent layout shift
    if (!hasMounted) {
        return (
            <nav className="sticky top-0 z-50 min-h-[100px] w-full bg-[#000] text-white border-b-2 border-white flex items-stretch py-10">
                <div className="h-8 w-full" />
            </nav>
        );
    }

    const showBagCount = hasMounted && cartMounted;

    return (
        <nav className="sticky top-0 z-50 min-h-[100px] w-full bg-[#000] text-white border-b-2 border-white flex items-stretch py-10">
            {/* Left: Brand Logo */}
            <div className="flex items-center px-8 border-r border-white">
                <Link href="/" className="font-heading text-4xl font-black tracking-tighter hover:text-white/80 transition-colors">
                    J&M HORIZONZ
                </Link>
            </div>

            {/* Center: Navigation */}
            <div className="flex-1 flex items-center justify-center space-x-12 border-r border-white">
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

            {/* Right: Icons */}
            <div className="flex items-center px-8 space-x-8">
                <Link href="/profile" className="hover:text-white/60 transition-colors">
                    <User size={24} strokeWidth={2} />
                </Link>
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
        </nav>
    );
};
