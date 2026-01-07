"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useCallback } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
    shippingAddress: z.string().min(5, "Shipping address must be detailed."),
    bio: z.string().optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

export const ProfileForm = ({ initialData }: { initialData: ProfileInput }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileInput>({
        resolver: zodResolver(profileSchema),
        defaultValues: initialData,
        mode: "onBlur", // Only validate on blur to reduce re-renders
    });

    const onSubmit = useCallback(async (data: ProfileInput) => {
        setIsLoading(true);
        setSuccess(false);
        setError(null);

        const res = await updateProfile(data);

        if (res.error) {
            setError(res.error);
        } else {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        setIsLoading(false);
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.4em] text-white mb-2">
                    SHIPPING PROTOCOL
                </label>
                <textarea
                    {...register("shippingAddress")}
                    rows={4}
                    placeholder="PHYSICAL_DESTINATION_NODES"
                    className="w-full bg-[#000] border-0 border-b border-white border-opacity-30 py-3 font-mono text-[12px] text-white placeholder:text-white placeholder:opacity-50 outline-none focus:border-opacity-100 focus:border-b-2 transition-all duration-200 resize-none"
                />
                {errors.shippingAddress && (
                    <p className="font-mono text-[8px] text-[#0F0] uppercase tracking-widest pt-1">
                        {errors.shippingAddress.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-[0.4em] text-white mb-2">
                    ENTITY BIO
                </label>
                <textarea
                    {...register("bio")}
                    rows={3}
                    placeholder="BIOMETRIC_DATA_OVERVIEW"
                    className="w-full bg-[#000] border-0 border-b border-white border-opacity-30 py-3 font-mono text-[12px] text-white placeholder:text-white placeholder:opacity-50 outline-none focus:border-opacity-100 focus:border-b-2 transition-all duration-200 resize-none"
                />
            </div>

            {error && (
                <div className="p-3 border border-[#0F0] border-opacity-50 text-[#0F0] font-mono text-[10px] uppercase tracking-widest text-center">
                    SYNC_ERROR: {error}
                </div>
            )}

            {success && (
                <div className="p-3 border border-white text-white font-mono text-[10px] uppercase tracking-widest text-center animate-pulse">
                    DATA_SYNCHRONIZED_SUCCESSFULLY
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-4 font-mono text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading && <Loader2 className="animate-spin" size={14} />}
                SYNC DATA
            </button>
        </form>
    );
};
