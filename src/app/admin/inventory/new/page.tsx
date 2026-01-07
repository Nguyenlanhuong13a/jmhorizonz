import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-heading uppercase tracking-tighter mb-4">Append Node</h1>
                <p className="font-mono text-xs uppercase tracking-widest opacity-40">Initialize New Product Entry in Neural Grid</p>
            </div>

            <ProductForm />
        </div>
    );
}
