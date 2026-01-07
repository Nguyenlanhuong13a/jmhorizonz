"use client";

import { motion } from "framer-motion";

export const Marquee = () => {
    return (
        <div className="w-full overflow-hidden bg-brand-black py-4 border-b border-white/10">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                    className="flex space-x-12"
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <span key={i} className="text-4xl font-heading text-white tracking-tighter">
                            SWISS PRECISION — NY GRIT — FUTURE READY — ARCHIVAL QUALITY —
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
