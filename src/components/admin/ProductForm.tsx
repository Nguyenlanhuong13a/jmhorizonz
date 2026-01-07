"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductInput } from "@/lib/validations/product";
import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDeferredValue } from "react";
import { createProduct, updateProduct } from "@/lib/actions/product";
import { Loader2, Plus, X } from "lucide-react";

interface ProductFormProps {
    initialData?: ProductInput;
    productId?: string;
}

export const ProductForm = ({ initialData, productId }: ProductFormProps) => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductInput>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            price: 0,
            stockCount: 0,
            category: undefined,
            description: "",
            images: [""],
            technicalSpecs: [""],
        },
        mode: "onBlur", // Only validate on blur to reduce re-renders
    });

    // Use deferred values to prevent re-renders on every keystroke
    const imagesValue = watch("images") || [];
    const technicalSpecsValue = watch("technicalSpecs") || [];
    const images = useDeferredValue(imagesValue);
    const technicalSpecs = useDeferredValue(technicalSpecsValue);

    const onSubmit = useCallback(async (data: ProductInput) => {
        setIsLoading(true);
        setError(null);

        try {
            let res;
            if (productId) {
                res = await updateProduct(productId, data);
            } else {
                res = await createProduct(data);
            }

            if (res.error) {
                setError(res.error);
            } else {
                router.push("/admin/inventory");
                router.refresh();
            }
        } catch (err) {
            setError("An external protocol error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [productId, router]);

    const addImageField = useCallback(() => {
        setValue("images", [...images, ""], { shouldDirty: true });
    }, [images, setValue]);

    const removeImageField = useCallback((index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setValue("images", newImages, { shouldDirty: true });
    }, [images, setValue]);

    const addSpecField = useCallback(() => {
        setValue("technicalSpecs", [...technicalSpecs, ""], { shouldDirty: true });
    }, [technicalSpecs, setValue]);

    const removeSpecField = useCallback((index: number) => {
        const newSpecs = [...technicalSpecs];
        newSpecs.splice(index, 1);
        setValue("technicalSpecs", newSpecs, { shouldDirty: true });
    }, [technicalSpecs, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Basic Info */}
                <div className="space-y-8">
                    <div className="bg-white border border-black p-8 space-y-6">
                        <h3 className="font-mono text-xs uppercase tracking-widest border-b border-black pb-4">Nodal Parameters</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase opacity-40">Node Name</label>
                                <input
                                    {...register("name")}
                                    placeholder="e.g. ALPHA_COAT"
                                    className="w-full border border-black/10 p-4 font-mono text-xs uppercase focus:bg-neutral-50 outline-none"
                                />
                                {errors.name && <p className="text-[8px] text-red-500 font-mono uppercase">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase opacity-40">System Slug</label>
                                <input
                                    {...register("slug")}
                                    placeholder="e.g. alpha-coat-v1"
                                    className="w-full border border-black/10 p-4 font-mono text-xs lowercase focus:bg-neutral-50 outline-none"
                                />
                                {errors.slug && <p className="text-[8px] text-red-500 font-mono uppercase">{errors.slug.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase opacity-40">Price (USD)</label>
                                    <input
                                        {...register("price")}
                                        type="number"
                                        className="w-full border border-black/10 p-4 font-mono text-xs focus:bg-neutral-50 outline-none"
                                    />
                                    {errors.price && <p className="text-[8px] text-red-500 font-mono uppercase">{errors.price.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="font-mono text-[10px] uppercase opacity-40">Stock Nodes</label>
                                    <input
                                        {...register("stockCount")}
                                        type="number"
                                        className="w-full border border-black/10 p-4 font-mono text-xs focus:bg-neutral-50 outline-none"
                                    />
                                    {errors.stockCount && <p className="text-[8px] text-red-500 font-mono uppercase">{errors.stockCount.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-mono text-[10px] uppercase opacity-40">Classification</label>
                                <select
                                    {...register("category")}
                                    className="w-full border border-black/10 p-4 font-mono text-xs uppercase focus:bg-neutral-50 outline-none appearance-none bg-white rounded-none"
                                >
                                    <option value="">SELECT_CATEGORY</option>
                                    <option value="Outerwear">Outerwear</option>
                                    <option value="Bottoms">Bottoms</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Archive">Archive</option>
                                </select>
                                {errors.category && <p className="text-[8px] text-red-500 font-mono uppercase">{errors.category.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-black p-8 space-y-6">
                        <h3 className="font-mono text-xs uppercase tracking-widest border-b border-black pb-4">Data Narrative</h3>
                        <textarea
                            {...register("description")}
                            rows={6}
                            placeholder="PROTCOL_DESCRIPTION_HERE"
                            className="w-full border border-black/10 p-4 font-mono text-xs uppercase focus:bg-neutral-50 outline-none resize-none"
                        />
                        {errors.description && <p className="text-[8px] text-red-500 font-mono uppercase">{errors.description.message}</p>}
                    </div>
                </div>

                {/* Media & Specs */}
                <div className="space-y-8">
                    <div className="bg-white border border-black p-8 space-y-6">
                        <div className="flex justify-between items-center border-b border-black pb-4">
                            <h3 className="font-mono text-xs uppercase tracking-widest">Image Grid</h3>
                            <button type="button" onClick={addImageField} className="p-1 hover:opacity-50"><Plus size={16} /></button>
                        </div>

                        <div className="space-y-4">
                            {images.map((_, index) => (
                                <div key={`image-${index}`} className="flex gap-2">
                                    <input
                                        {...register(`images.${index}`)}
                                        placeholder="IMAGE_URL_NODE"
                                        className="flex-1 border border-black/10 p-4 font-mono text-[10px] uppercase outline-none focus:bg-neutral-50 transition-colors"
                                    />
                                    {images.length > 1 && (
                                        <button type="button" onClick={() => removeImageField(index)} className="p-4 border border-black hover:bg-black hover:text-white transition-colors">
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {errors.images && <p className="text-[8px] text-red-500 font-mono uppercase">{errors.images.message}</p>}
                        </div>
                    </div>

                    <div className="bg-white border border-black p-8 space-y-6">
                        <div className="flex justify-between items-center border-b border-black pb-4">
                            <h3 className="font-mono text-xs uppercase tracking-widest">Tech Specs</h3>
                            <button type="button" onClick={addSpecField} className="p-1 hover:opacity-50"><Plus size={16} /></button>
                        </div>

                        <div className="space-y-4">
                            {technicalSpecs.map((_, index) => (
                                <div key={`spec-${index}`} className="flex gap-2">
                                    <input
                                        {...register(`technicalSpecs.${index}`)}
                                        placeholder="SPEC_DATA_POINT"
                                        className="flex-1 border border-black/10 p-4 font-mono text-[10px] uppercase outline-none focus:bg-neutral-50 transition-colors"
                                    />
                                    {technicalSpecs.length > 1 && (
                                        <button type="button" onClick={() => removeSpecField(index)} className="p-4 border border-black hover:bg-black hover:text-white transition-colors">
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 border border-red-500/20 bg-red-50 text-red-500 font-mono text-[10px] uppercase tracking-widest text-center">
                    ERROR_LOG: {error}
                </div>
            )}

            <div className="flex justify-end gap-6 pt-12 border-t border-black">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-12 py-5 font-mono text-[10px] uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black text-white px-16 py-5 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-neutral-800 transition-colors flex items-center gap-3"
                >
                    {isLoading && <Loader2 className="animate-spin" size={14} />}
                    Commit Changes
                </button>
            </div>
        </form>
    );
};
