"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function syncCart(items: { productId: string, quantity: number }[]) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return { error: "Unauthenticated" };

        const userId = session.user.id;

        // Use a transaction to ensure atomic update
        await db.$transaction([
            // Clear existing cart
            db.cartItem.deleteMany({ where: { userId } }),
            // Add new items
            db.cartItem.createMany({
                data: items.map(item => ({
                    userId,
                    productId: item.productId,
                    quantity: item.quantity
                }))
            })
        ]);

        return { success: true };
    } catch (error: unknown) {
        return { error: error instanceof Error ? error.message : "Failed to sync cart" };
    }
}

export async function getDBCart() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return [];

        return await db.cartItem.findMany({
            where: { userId: session.user.id },
            include: { product: true }
        });
    } catch (_error) {
        return [];
    }
}
