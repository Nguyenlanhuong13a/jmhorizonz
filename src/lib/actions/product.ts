"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { productSchema, ProductInput } from "@/lib/validations/product";
import { revalidatePath } from "next/cache";

import { Prisma, ProductCategory } from "@prisma/client";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized. Admin privileges required.");
    }
}

export async function createProduct(data: ProductInput) {
    try {
        await checkAdmin();
        const validated = productSchema.parse(data);

        const product = await db.product.create({
            data: {
                ...validated,
                technicalSpecs: validated.technicalSpecs || [],
                category: validated.category as ProductCategory,
            },
        });

        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        revalidatePath("/collections");
        return { success: true, product };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create product.";
        return { error: message };
    }
}

export async function updateProduct(id: string, data: ProductInput) {
    try {
        await checkAdmin();
        const validated = productSchema.parse(data);

        const product = await db.product.update({
            where: { id },
            data: {
                ...validated,
                technicalSpecs: validated.technicalSpecs || [],
            },
        });

        revalidatePath("/admin/inventory");
        if (product.slug) revalidatePath(`/product/${product.slug}`);
        revalidatePath("/shop");
        return { success: true, product };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update product.";
        return { error: message };
    }
}

export async function deleteProduct(id: string) {
    try {
        await checkAdmin();
        await db.product.delete({
            where: { id },
        });

        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        return { success: true };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to delete product.";
        return { error: message };
    }
}

export async function getProducts(options?: {
    category?: string | 'All';
    limit?: number;
    page?: number;
    homepage?: boolean;
    publishedOnly?: boolean;
}) {
    try {
        const where: Prisma.ProductWhereInput = {};

        if (options?.publishedOnly !== false) {
            where.published = true;
        }

        if (options?.category && options.category !== 'All') {
            where.category = options.category as ProductCategory;
        }

        const skip = options?.page ? (options.page - 1) * (options.limit || 12) : 0;

        const [products, total] = await db.$transaction([
            db.product.findMany({
                where,
                take: options?.limit,
                skip,
                orderBy: { createdAt: "desc" },
            }),
            db.product.count({ where })
        ]);

        return { products, total };
    } catch (error) {
        // Silently return empty array on error
        return { products: [], total: 0 };
    }
}

export async function getAdminProducts() {
    try {
        await checkAdmin();
        return await db.product.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (_error) {
        return [];
    }
}

export async function toggleProductPublish(id: string, published: boolean) {
    try {
        await checkAdmin();
        await db.product.update({
            where: { id },
            data: { published },
        });
        revalidatePath("/admin/inventory");
        revalidatePath("/shop");
        return { success: true };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to toggle status.";
        return { error: message };
    }
}
