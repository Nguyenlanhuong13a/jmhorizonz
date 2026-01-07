"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    useEffect(() => {
        // Prevent scrolling on auth pages
        document.body.classList.add('scroll-none');
        return () => {
            document.body.classList.remove('scroll-none');
        };
    }, []);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur", // Only validate on blur to reduce re-renders
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (res?.error) {
                setError("Invalid email or password.");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("An external protocol error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="fixed inset-0 h-screen w-screen flex items-center justify-center p-6 bg-[#000] overflow-hidden">
            {/* Background IDENTIFY Header - Outline Style */}
            <h1 className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                <span 
                    className="text-[15vw] font-heading uppercase leading-none tracking-tighter max-w-full max-h-full"
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '1px #FFF',
                        opacity: 0.15
                    } as React.CSSProperties}
                >
                    IDENTIFY
                </span>
            </h1>

            {/* Form Container */}
            <motion.div 
                className="w-full max-w-sm space-y-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
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
                            className="w-full bg-transparent border-0 border-b border-white border-opacity-30 py-3 font-mono text-[12px] text-white placeholder:text-white placeholder:opacity-50 outline-none focus:border-opacity-100 focus:border-b-2 focus:animate-[flicker_0.15s_ease-in-out_infinite] transition-[border]"
                        />
                        {errors.email && (
                            <p className="font-mono text-[8px] text-[#0F0] uppercase tracking-widest pt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white mb-2">
                            PASSWORD_NODE
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-transparent border-0 border-b border-white border-opacity-30 py-3 font-mono text-[12px] text-white placeholder:text-white placeholder:opacity-50 outline-none focus:border-opacity-100 focus:border-b-2 focus:animate-[flicker_0.15s_ease-in-out_infinite] transition-[border]"
                        />
                        {errors.password && (
                            <p className="font-mono text-[8px] text-[#0F0] uppercase tracking-widest pt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 border border-[#0F0] border-opacity-50 text-[#0F0] font-mono text-[10px] uppercase tracking-widest text-center">
                            Error: {error}
                        </div>
                    )}

                    {/* Initialize Access Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-white text-black font-mono text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 className="animate-spin" size={14} />}
                        Initialize Access
                    </button>
                </form>

                {/* Social Login Divider */}
                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white border-opacity-20" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-[#000] px-4 font-mono text-[8px] text-white text-opacity-40 uppercase tracking-widest">
                            Or Connect Via
                        </span>
                    </div>
                </div>

                {/* Google Node Button */}
                <button
                    onClick={() => signIn("google")}
                    className="w-full py-4 border border-white border-opacity-30 bg-transparent text-white font-mono text-[12px] uppercase tracking-[0.2em] hover:border-opacity-100 transition-colors flex items-center justify-center gap-3"
                >
                    Google Node
                </button>

                {/* Links */}
                <div className="text-center space-y-3 pt-4">
                    <Link
                        href="/auth/register"
                        className="block font-mono text-[11px] text-white text-opacity-80 uppercase tracking-widest hover:text-opacity-100 transition-opacity underline decoration-1 underline-offset-4"
                    >
                        Register Entity
                    </Link>
                    <Link
                        href="/auth/forgot-password"
                        className="block font-mono text-[11px] text-white text-opacity-80 uppercase tracking-widest hover:text-opacity-100 transition-opacity underline decoration-1 underline-offset-4"
                    >
                        Forgot Password
                    </Link>
                </div>

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
