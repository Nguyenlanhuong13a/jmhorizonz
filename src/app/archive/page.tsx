import { ProductGrid } from "@/components/sections/ProductGrid";
import { getProducts } from "@/lib/actions/product";
import ComingSoonPlaceholderWrapper from "@/components/sections/ComingSoonPlaceholderWrapper";

export default async function ArchivePage() {
    const { products } = await getProducts({
        category: "OUTERWEAR",
        limit: 12,
    });

    if (products.length === 0) {
        return <ComingSoonPlaceholderWrapper />;
    }

    return (
        <main className="flex-grow">
            <ProductGrid
                products={products}
                title="The Archive"
                category="OUTERWEAR"
                subtitle="Previous iterations and experimental prototypes."
            />
        </main>
    );
}
