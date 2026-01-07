import { ProductGrid } from "@/components/sections/ProductGrid";
import { getProducts } from "@/lib/actions/product";
import ComingSoonPlaceholderWrapper from "@/components/sections/ComingSoonPlaceholderWrapper";

export default async function ShopPage() {
    const { products } = await getProducts({
        category: "All",
        limit: 12,
    });

    if (products.length === 0) {
        return <ComingSoonPlaceholderWrapper />;
    }

    return (
        <main className="flex-grow">
            <ProductGrid
                products={products}
                title="Full Catalog"
                category="All"
                subtitle="All available drops and archival releases."
            />
        </main>
    );
}
