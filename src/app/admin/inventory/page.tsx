"use client";

import { useEffect, useState } from "react";
import { getAdminProducts, toggleProductPublish } from "@/lib/actions/product";
import { Product } from "@/types";
import Image from "next/image";
import { Switch } from "@/components/ui/Switch";
import { toast } from "react-hot-toast";

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getAdminProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleToggle = async (id: string, published: boolean) => {
        const result = await toggleProductPublish(id, !published);
        if (result.success) {
            setProducts(prev => prev.map(p => p.id === id ? { ...p, published: !published } : p));
            toast.success("Status updated");
        } else {
            toast.error(result.error || "Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 px-12">
                <h1 className="text-4xl font-heading uppercase mb-12">Inventory System</h1>
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-20 bg-neutral-100 border border-black/5" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-12 pb-24">
            <div className="flex justify-between items-end mb-12 border-b border-black pb-8">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Central Intelligence</p>
                    <h1 className="text-6xl font-heading uppercase tracking-tighter">Inventory Control</h1>
                </div>
                <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">Total Nodes: {products.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
                {products.map((product) => (
                    <div key={product.id} className="group flex items-center gap-8 p-4 border border-black/10 hover:border-black transition-colors">
                        <div className="relative w-16 aspect-[4/5] bg-neutral-100 overflow-hidden">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-heading uppercase text-lg leading-none mb-1">{product.name}</h3>
                            <p className="font-mono text-[10px] uppercase opacity-40">{product.category} / Node-{product.id}</p>
                        </div>

                        <div className="w-24 text-right">
                            <p className="font-mono text-sm font-bold">${product.price}</p>
                        </div>

                        <div className="w-32 text-center">
                            <span className={`font-mono text-[10px] uppercase px-3 py-1 border ${product.stockCount > 0 ? 'border-black text-black' : 'border-red-500 text-red-500'}`}>
                                Stock: {product.stockCount}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 pl-8 border-l border-black/10">
                            <div className="flex flex-col items-end">
                                <span className="font-mono text-[8px] uppercase tracking-widest opacity-40 mb-1">Live Status</span>
                                <Switch
                                    checked={product.published}
                                    onCheckedChange={() => handleToggle(product.id, product.published || false)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
