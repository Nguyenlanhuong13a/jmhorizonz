"use client";

import { ComingSoonPlaceholder } from "./ComingSoonPlaceholder";
import { Product } from "@/types";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

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
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    if (products.length === 0) {
        return <ComingSoonPlaceholder />;
    }

    // Generate random technical data
    const getRandomRef = () => `REF: ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 99)}`;
    const getRandomBatch = () => `BATCH: ${String(Math.floor(Math.random() * 99)).padStart(2, '0')}`;

    return (
        <section className="py-24 border-t border-black">
            <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    {subtitle && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">
                            {subtitle}
                        </p>
                    )}
                    <h2 className="text-display-large font-heading leading-none uppercase tracking-tighter">
                        {title || "INVENTORY LIST"}
                    </h2>
                </div>

                <div className="hidden md:block">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-right opacity-40">
                        {category} — {homepage ? "Essentials" : `Page ${page}`}
                    </p>
                </div>
            </div>

            {/* Desktop: List View */}
            <div className="hidden lg:block border-t border-black">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="border-b border-black py-4 flex justify-between items-center px-6 md:px-12 hover:bg-neutral-50 transition-colors group relative"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        {/* ID No. */}
                        <div className="w-16 font-mono text-xs opacity-60">
                            #{String(index + 1).padStart(3, '0')}
                        </div>

                        {/* Name */}
                        <div className="flex-1 px-4">
                            <Link href={`/product/${product.id}`} className="font-heading font-bold text-lg uppercase tracking-tighter hover:underline">
                                {product.name}
                            </Link>
                            <div className="font-mono text-[10px] opacity-60 mt-1">
                                {getRandomRef()} • {getRandomBatch()}
                            </div>
                        </div>

                        {/* Category */}
                        <div className="w-32 font-mono text-xs uppercase">
                            {product.category}
                        </div>

                        {/* Stock */}
                        <div className="w-24 font-mono text-xs">
                            STOCK: <span className={product.stockCount > 0 ? 'text-[#00FF00]' : 'text-red-500'}>{product.stockCount}</span>
                        </div>

                        {/* Price */}
                        <div className="w-24 font-mono text-sm font-bold">
                            ${product.price.toFixed(2)}
                        </div>

                        {/* Add Button */}
                        <div className="w-20">
                            <button
                                onClick={() => {
                                    if (product.stockCount > 0 && isMounted) addItem(product);
                                }}
                                disabled={!isMounted || product.stockCount === 0}
                                className="w-full px-3 py-1 border border-black bg-white text-black font-mono text-xs uppercase hover:invert transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {product.stockCount > 0 ? '+' : 'OUT'}
                            </button>
                        </div>

                        {/* Floating Image on Hover */}
                        {hoveredProduct === product.id && product.images[0] && (
                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                <div className="relative w-64 h-80 bg-white border border-black">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile: Grid View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 border-t border-black">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border-b border-r border-black last:border-r-0"
                    >
                        <Link href={`/product/${product.id}`} className="block">
                            <div className="relative w-full aspect-[3/4] bg-neutral-100">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-heading font-bold text-sm uppercase tracking-tighter">
                                        {product.name}
                                    </h3>
                                    <p className="font-mono text-[10px] opacity-60 mt-1">
                                        {getRandomRef()} • {getRandomBatch()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-sm font-bold">${product.price.toFixed(2)}</p>
                                    <p className="font-mono text-[10px] opacity-60">
                                        STOCK: <span className={product.stockCount > 0 ? 'text-[#00FF00]' : 'text-red-500'}>{product.stockCount}</span>
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (product.stockCount > 0 && isMounted) addItem(product);
                                }}
                                disabled={!isMounted || product.stockCount === 0}
                                className="w-full px-3 py-2 border border-black bg-white text-black font-mono text-xs uppercase hover:invert transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {product.stockCount > 0 ? 'ADD (+)' : 'OUT OF STOCK'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
