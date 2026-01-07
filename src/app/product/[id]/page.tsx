import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./AddToCartButton";

import { Product } from "@/types";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const products = await db.product.findMany({
        select: { id: true }
    });
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;

    const product = await db.product.findUnique({
        where: { id }
    });

    if (!product) {
        notFound();
    }

    return (
        <main className="flex-grow pt-24 pb-24 px-6 md:px-12 flex flex-col lg:flex-row gap-16">
            {/* Image Gallery */}
            <div className="flex-1 grid grid-cols-1 gap-4">
                {product.images.map((img, i) => (
                    <div key={`product-image-${i}`} className="relative aspect-[3/4] bg-neutral-100 overflow-hidden group">
                        <Image
                            src={img}
                            alt={product.name}
                            fill
                            priority={i === 0}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* Product Details */}
            <div className="flex-1 lg:sticky lg:top-32 h-fit space-y-12">
                <div>
                    <div className="flex justify-between items-baseline mb-4">
                        <h1 className="text-[5vw] lg:text-[4vw] font-heading uppercase tracking-tighter leading-none">
                            {product.name}
                        </h1>
                        <p className="font-mono text-2xl font-bold">${product.price}</p>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-widest opacity-40 mb-8">
                        {product.category} / Node-{product.id}
                    </p>

                    <div className="w-full h-[1px] bg-black mb-8" />

                    <p className="text-sm font-serif leading-relaxed opacity-80 mb-8">
                        {product.description}
                    </p>
                </div>

                <div className="space-y-6">
                    <h3 className="font-mono text-[10px] uppercase tracking-widest opacity-40">Technical Specs</h3>
                    <ul className="space-y-3">
                        {(product.technicalSpecs as string[]).map((spec, i) => (
                            <li key={`spec-${i}-${spec}`} className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 bg-black" />
                                <span>{spec}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="font-mono text-[10px] uppercase tracking-widest opacity-40">Sizing Node</h3>
                    <div className="flex gap-3">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                            <button key={size} className="w-12 h-12 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-colors font-mono text-xs">
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-12">
                    <AddToCartButton product={product} />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-black/10 text-center bg-neutral-50/50">
                            <p className="font-mono text-[8px] uppercase tracking-widest opacity-40 mb-1">Origin</p>
                            <p className="font-mono text-[10px] uppercase font-bold">Switzerland</p>
                        </div>
                        <div className="p-4 border border-black/10 text-center bg-neutral-50/50">
                            <p className="font-mono text-[8px] uppercase tracking-widest opacity-40 mb-1">Material</p>
                            <p className="font-mono text-[10px] uppercase font-bold">Technical Synthetic</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
