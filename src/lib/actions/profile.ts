"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const profileSchema = z.object({
    shippingAddress: z.string().min(5, "Shipping address must be detailed."),
    bio: z.string().optional(),
});

export async function updateProfile(data: z.infer<typeof profileSchema>) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) throw new Error("Unauthenticated.");

        const validated = profileSchema.parse(data);

        await db.profile.update({
            where: { userId: session.user.id },
            data: validated,
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (error: unknown) {
        return { error: error instanceof Error ? error.message : "Failed to update profile" };
    }
}
