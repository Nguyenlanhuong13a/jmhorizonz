"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

const cardVariants: Variants = {
    initial: { opacity: 0.8, y: 0 },
    hover: { opacity: 1 },
};

export const ProductCard = ({ product }: { product: Product }) => {
    const { addItem, isMounted } = useCart();

    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            className="group relative flex flex-col border-b border-black/10 md:border-b-0 md:border-r border-black/10 last:border-r-0 p-6 hover:bg-neutral-50 transition-colors duration-100"
        >
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-6 cursor-pointer block">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.stockCount === 0 ? 'opacity-30 grayscale' : 'opacity-80 group-hover:opacity-100'}`}
                />

                {product.stockCount === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="border border-black bg-white/90 px-6 py-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">SOLD OUT / ARCHIVED</span>
                        </div>
                    </div>
                )}

                {/* Size Selector Reveal on Hover */}
                {product.stockCount > 0 && (
                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out bg-white border-t border-black flex justify-between items-center z-10">
                        <span className="text-[10px] font-mono uppercase tracking-widest">Select Size</span>
                        <div className="flex space-x-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    className="w-8 h-8 flex items-center justify-center border border-black text-[10px] font-mono hover:bg-black hover:text-white rounded-full transition-colors"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </Link>

            {/* Product Info */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-heading leading-tight uppercase tracking-tight">
                        {product.name}
                    </h3>
                    <p className="font-mono text-[10px] mt-1 opacity-60 uppercase">
                        {product.category}
                    </p>
                </div>
            </div>

            {/* Price & Quick Add Box */}
            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out z-20">
                <div className="bg-white border border-black p-1 flex items-stretch shadow-xl">
                    <div className="flex-1 flex items-center justify-center border-r border-black py-3">
                        <span className="font-mono text-xs font-bold">${product.price}</span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (product.stockCount > 0) addItem(product);
                        }}
                        disabled={!isMounted || product.stockCount === 0}
                        className="flex-[2] py-3 bg-black text-white font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors disabled:opacity-50"
                    >
                        {isMounted ? (product.stockCount > 0 ? 'Quick Add +' : 'SOLD OUT') : '...'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
