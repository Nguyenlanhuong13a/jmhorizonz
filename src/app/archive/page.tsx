import { ProductGrid } from "@/components/sections/ProductGrid";
import { ComingSoonPlaceholder } from "@/components/sections/ComingSoonPlaceholder";
import { getProducts } from "@/lib/actions/product";

export default async function ArchivePage() {
    const { products } = await getProducts({
        category: "OUTERWEAR",
        limit: 12,
    });

    if (products.length === 0) {
        return <ComingSoonPlaceholder />;
    }

    return (
        <main>
            <ProductGrid
                products={products}
                title="The Archive"
                category="OUTERWEAR"
                subtitle="Previous iterations and experimental prototypes."
            />
        </main>
    );
}
