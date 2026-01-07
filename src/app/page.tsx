import { Hero } from "@/components/sections/Hero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Marquee } from "@/components/ui/Marquee";
import { getProducts } from "@/lib/actions/product";
import Link from "next/link";

export default async function Home() {
  const { products } = await getProducts({
    homepage: true,
    limit: 4,
  });

  return (
    <main className="textured-noise bg-white text-black flex-grow">
      <Hero />
      <Marquee />

      <ProductGrid
        products={products}
        title="Essential Archives"
        subtitle="Current Drop — 01"
        homepage={true}
      />

      {/* Show All Archives Button - Only visible when products exist */}
      {products.length > 0 && (
        <div className="flex justify-center py-24 border-b border-black/10">
          <Link
            href="/collections"
            className="group relative border border-black px-12 py-5 font-mono text-[10px] uppercase tracking-[0.4em] transition-all duration-300 hover:bg-black hover:text-white"
          >
            <span className="relative z-10 font-bold">Show All Archives</span>
          </Link>
        </div>
      )}
    </main>
  );
}
