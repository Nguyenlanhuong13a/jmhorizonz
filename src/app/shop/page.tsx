import { ProductGrid } from "@/components/sections/ProductGrid";
import { ComingSoonPlaceholder } from "@/components/sections/ComingSoonPlaceholder";
import { getProducts } from "@/lib/actions/product";

export default async function ShopPage() {
    const { products } = await getProducts({
        category: "All",
        limit: 12,
    });

    if (products.length === 0) {
        return <ComingSoonPlaceholder />;
    }

    return (
        <main>
            <ProductGrid
                products={products}
                title="Full Catalog"
                category="All"
                subtitle="All available drops and archival releases."
            />
        </main>
    );
}
