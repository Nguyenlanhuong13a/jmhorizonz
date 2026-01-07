import { Hero } from "@/components/sections/Hero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Marquee } from "@/components/ui/Marquee";
import { IntroSequence } from "@/components/sections/IntroSequence";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { getProducts } from "@/lib/actions/product";
import Link from "next/link";

// Force dynamic rendering to avoid build-time blocking
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Add timeout and error handling for build-time safety
  let products: any[] = [];
  let introProducts: any[] = [];
  
  try {
    const productsResult = await Promise.race([
      getProducts({ homepage: true, limit: 4 }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
    ]) as { products: any[] };
    products = productsResult.products || [];
  } catch (error) {
    console.warn('Failed to fetch products for homepage:', error);
    products = [];
  }

  try {
    const introResult = await Promise.race([
      getProducts({ homepage: true, limit: 12 }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
    ]) as { products: any[] };
    introProducts = introResult.products || [];
  } catch (error) {
    console.warn('Failed to fetch products for intro:', error);
    introProducts = [];
  }

  return (
    <div className="min-h-[250vh] md:min-h-[400vh]">
      {/* Intro Sequence - Sticky during scroll - Client only to avoid SSR issues */}
      <ClientOnly>
        <IntroSequence products={introProducts} />
      </ClientOnly>
      
      {/* Main Content - Wrapped for seamless transition */}
      <main id="main-content" className="textured-noise bg-white text-black flex-grow">
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
    </div>
  );
}
