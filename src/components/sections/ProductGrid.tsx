"use client";

import { ComingSoonPlaceholder } from "./ComingSoonPlaceholder";
import { Product } from "@/types";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductGridProps {
    products: Product[];
    title?: string;
    subtitle?: string;
    category?: string | 'All';
    page?: number;
    homepage?: boolean;
}

export const ProductGrid = ({
    products,
    title,
    subtitle,
    category = 'All',
    page = 1,
    homepage = false
}: ProductGridProps) => {
    const { addItem, isMounted } = useCart();
    const scrollRef = useRef<HTMLDivElement>(null);

    if (products.length === 0) {
        return <ComingSoonPlaceholder />;
    }

    const getLayoutClass = (index: number) => {
        const mod = index % 3;
        if (mod === 0) return "w-[60%] ml-0"; // Large, Left
        if (mod === 1) return "w-[30%] ml-auto mr-0 -mt-32"; // Small, Right, Overlapping
        return "w-[50%] mx-auto"; // Medium, Centered
    };

    return (
        <section className="py-12 md:py-24 border-t border-black overflow-x-hidden">
            <div className="px-6 md:px-12 mb-12 md:mb-16">
                {subtitle && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">
                        {subtitle}
                    </p>
                )}
                <h2 className="text-display-large font-heading leading-none uppercase tracking-tighter">
                    {title || "LOOKBOOK"}
                </h2>
            </div>

            {/* Desktop: Editorial Scatter Layout */}
            <div className="hidden lg:block px-6 md:px-12 space-y-8">
                {products.map((product, index) => {
                    const layoutClass = getLayoutClass(index);
                    return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative ${layoutClass} group`}
                        >
                            <Link href={`/product/${product.id}`} className="block">
                                <div className="relative aspect-[4/5] bg-neutral-100 border border-black overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    
                                    {/* Huge Product Name with mix-blend-mode */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <h3 
                                            className="font-heading font-black uppercase tracking-tighter text-white"
                                            style={{ 
                                                fontSize: 'clamp(3rem, 8vw, 8rem)',
                                                mixBlendMode: 'difference'
                                            }}
                                        >
                                            {product.name}
                                        </h3>
                                    </div>

                                    {/* Price in unexpected corner */}
                                    <div className="absolute top-2 right-2 bg-white border border-black px-2 py-1">
                                        <span className="font-mono text-[10px] uppercase tracking-widest">
                                            ${product.price.toFixed(0)}
                                        </span>
                                    </div>

                                    {/* Add Button - appears on hover */}
                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (product.stockCount > 0 && isMounted) addItem(product);
                                            }}
                                            disabled={!isMounted || product.stockCount === 0}
                                            className="px-4 py-2 border-2 border-black bg-white text-black font-mono text-xs uppercase hover:invert transition-all disabled:opacity-30"
                                        >
                                            ADD +
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile: Horizontal Swipe Carousel */}
            <div className="lg:hidden">
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-6 pb-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[85vw] snap-center"
                        >
                            <Link href={`/product/${product.id}`} className="block">
                                <div className="relative aspect-[3/4] bg-neutral-100 border border-black overflow-hidden mb-4">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    
                                    {/* Product Name */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <h3 
                                            className="font-heading font-black uppercase tracking-tighter text-white px-4 text-center"
                                            style={{ 
                                                fontSize: 'clamp(2rem, 10vw, 4rem)',
                                                mixBlendMode: 'difference'
                                            }}
                                        >
                                            {product.name}
                                        </h3>
                                    </div>

                                    {/* Price */}
                                    <div className="absolute top-2 right-2 bg-white border border-black px-2 py-1">
                                        <span className="font-mono text-[10px] uppercase tracking-widest">
                                            ${product.price.toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            
                            {/* Thumb-friendly Add Button */}
                            <button
                                onClick={() => {
                                    if (product.stockCount > 0 && isMounted) addItem(product);
                                }}
                                disabled={!isMounted || product.stockCount === 0}
                                className="w-full py-4 border-2 border-black bg-white text-black font-mono text-sm uppercase tracking-widest hover:invert transition-all disabled:opacity-30 touch-manipulation"
                            >
                                ADD +
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
