"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
        throw new Error("Unauthorized. Admin privileges required.");
    }
}

export async function updateOrderStatus(orderId: string, status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
    try {
        await checkAdmin();

        await db.order.update({
            where: { id: orderId },
            data: { status }
        });

        revalidatePath("/admin/orders");
        revalidatePath("/profile"); // User can see order status in profile
        return { success: true };
    } catch (error: unknown) {
        return { error: error instanceof Error ? error.message : "Failed to update status" };
    }
}
