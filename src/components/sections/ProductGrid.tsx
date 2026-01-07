"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { ComingSoonSection } from "./ComingSoonSection";
import { Product } from "@/types";

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
    if (products.length === 0) {
        return (
            <section className="py-24 border-t border-black">
                <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-4">
                        {subtitle && (
                            <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">
                                {subtitle}
                            </p>
                        )}
                        <h2 className="text-[8vw] md:text-[6vw] font-heading leading-none uppercase tracking-tighter">
                            {title || "Deployments"}
                        </h2>
                    </div>

                    <div className="hidden md:block">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-right opacity-40">
                            {category} — {homepage ? "Essentials" : `Page ${page}`}
                        </p>
                    </div>
                </div>

                <ComingSoonSection />
            </section>
        );
    }

    return (
        <section className="py-24 border-t border-black">
            <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    {subtitle && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">
                            {subtitle}
                        </p>
                    )}
                    <h2 className="text-[8vw] md:text-[6vw] font-heading leading-none uppercase tracking-tighter">
                        {title || "Deployments"}
                    </h2>
                </div>

                <div className="hidden md:block">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-right opacity-40">
                        {category} — {homepage ? "Essentials" : `Page ${page}`}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-black">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};
