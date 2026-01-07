import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;

    const product = await db.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-heading uppercase tracking-tighter mb-4">Edit Node</h1>
                <p className="font-mono text-xs uppercase tracking-widest opacity-40">Modify Existing Sequence: {product.slug}</p>
            </div>

            <ProductForm initialData={product} productId={product.id} />
        </div>
    );
}
