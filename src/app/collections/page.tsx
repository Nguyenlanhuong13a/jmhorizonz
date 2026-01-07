import { ProductGrid } from "@/components/sections/ProductGrid";
import { ComingSoonPlaceholder } from "@/components/sections/ComingSoonPlaceholder";
import { getProducts } from "@/lib/actions/product";
import { CollectionsPagination } from "@/components/sections/CollectionsPagination";
import { Suspense } from "react";

interface CollectionsPageProps {
    searchParams: { page?: string };
}

async function CollectionsContent({ page }: { page: number }) {
    const { products, total } = await getProducts({
        page,
        limit: 12,
    });

    const totalPages = Math.ceil(total / 12);

    if (products.length === 0) {
        return <ComingSoonPlaceholder />;
    }

    return (
        <>
            <ProductGrid
                products={products}
                title="Full Collection"
                subtitle="Archive Inventory — v0.1"
                page={page}
            />

            <CollectionsPagination
                currentPage={page}
                totalPages={totalPages}
                total={total}
            />
        </>
    );
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
    const currentPage = parseInt(searchParams.page || "1");

    return (
        <main className="textured-noise bg-white text-black flex-grow">
            <Suspense fallback={
                <div className="min-h-screen py-24 flex items-center justify-center font-mono text-xs animate-pulse">
                    Initializing Neural Grid...
                </div>
            }>
                <CollectionsContent page={currentPage} />
            </Suspense>
        </main>
    );
}
