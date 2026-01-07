"use server";

import { db } from "@/lib/db";
import { registerSchema, RegisterInput } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterInput) {
    const validatedFields = registerSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Invalid data fields." };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Email already in use." };
        }

        await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                profile: {
                    create: {}, // Create empty profile
                },
            },
        });

        return { success: "User created successfully." };
    } catch (_err) {
        return { error: "Internal database protocol error." };
    }
}
