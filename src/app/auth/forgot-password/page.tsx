"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    useEffect(() => {
        // Prevent scrolling on auth pages
        document.body.classList.add('scroll-none');
        return () => {
            document.body.classList.remove('scroll-none');
        };
    }, []);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onBlur", // Only validate on blur to reduce re-renders
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        setIsLoading(true);
        setError(null);

        // TODO: Implement password reset logic
        setTimeout(() => {
            setSuccess(true);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <main className="fixed inset-0 h-screen w-screen flex items-center justify-center p-6 bg-[#000] overflow-hidden">
            {/* Background Header - Outline Style */}
            <h1 className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                <span 
                    className="font-heading uppercase leading-none tracking-tighter max-w-full max-h-full"
                    style={{
                        fontSize: 'clamp(4rem, 15vw, 12rem)',
                        color: 'transparent',
                        WebkitTextStroke: '1px #FFF',
                        opacity: 0.15
                    } as React.CSSProperties}
                >
                    RECOVER
                </span>
            </h1>

            {/* Form Container */}
            <motion.div 
                className="w-full max-w-sm space-y-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <p className="font-mono text-[12px] text-[#0F0] uppercase tracking-widest">
                            Reset link sent to your email
                        </p>
                        <Link
                            href="/auth/login"
                            className="block font-mono text-[11px] text-white text-opacity-80 uppercase tracking-widest hover:text-opacity-100 transition-opacity underline decoration-1 underline-offset-4"
                        >
                            Return to Login
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-1">
                                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white mb-2">
                                    EMAIL_ADDRESS
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="user@domain.com"
                                    className="w-full bg-transparent border-0 border-b border-white border-opacity-30 py-3 font-mono text-[12px] text-white placeholder:text-white placeholder:opacity-50 outline-none focus:border-opacity-100 focus:border-b-2 transition-all duration-200"
                                />
                                {errors.email && (
                                    <p className="font-mono text-[8px] text-[#0F0] uppercase tracking-widest pt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 border border-[#0F0] border-opacity-50 text-[#0F0] font-mono text-[10px] uppercase tracking-widest text-center">
                                    Error: {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-white text-black font-mono text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading && <Loader2 className="animate-spin" size={14} />}
                                Send Reset Link
                            </button>
                        </form>

                        {/* Links */}
                        <div className="text-center space-y-3 pt-4">
                            <Link
                                href="/auth/login"
                                className="block font-mono text-[11px] text-white text-opacity-80 uppercase tracking-widest hover:text-opacity-100 transition-opacity underline decoration-1 underline-offset-4"
                            >
                                Return to Login
                            </Link>
                        </div>
                    </>
                )}

                {/* Security Status */}
                <motion.div 
                    className="text-center pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p className="font-mono text-[8px] text-[#0F0] uppercase tracking-widest">
                        <span className="inline-block animate-pulse">●</span> Security Status: Encrypted
                    </p>
                </motion.div>
            </motion.div>
        </main>
    );
}

