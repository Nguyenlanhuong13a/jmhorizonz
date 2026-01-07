"use client";

import { motion } from "framer-motion";

export const Marquee = () => {
    return (
        <div className="w-full overflow-hidden">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                    className="flex space-x-8"
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <span key={`marquee-item-${i}`} className="font-mono text-xs uppercase tracking-widest">
                            SYSTEM ONLINE // WORLDWIDE SHIPPING ACTIVE // SYSTEM ONLINE // WORLDWIDE SHIPPING ACTIVE //
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
