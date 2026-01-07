import * as z from "zod";

export const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    slug: z.string().min(2, "Slug must be at least 2 characters."),
    price: z.coerce.number().positive("Price must be a positive number."),
    stockCount: z.coerce.number().int().nonnegative("Stock count cannot be negative."),
    category: z.enum(["OUTERWEAR", "BOTTOMS", "FOOTWEAR", "ACCESSORIES"]),
    description: z.string().min(10, "Description must be at least 10 characters."),
    images: z.array(z.string().url()).min(1, "At least one image URL is required."),
    technicalSpecs: z.array(z.string()).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
