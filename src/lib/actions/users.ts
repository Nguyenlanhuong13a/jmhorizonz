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

export async function toggleUserRole(userId: string) {
    try {
        await checkAdmin();

        const user = await db.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user) throw new Error("Entity not found.");

        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

        await db.user.update({
            where: { id: userId },
            data: { role: newRole }
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: unknown) {
        return { error: error instanceof Error ? error.message : "Failed to toggle role" };
    }
}

export async function getUsers() {
    try {
        await checkAdmin();
        return await db.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
    } catch (_error) {
        return [];
    }
}
