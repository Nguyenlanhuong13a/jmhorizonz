"use client";

import { motion } from "framer-motion";

export const ComingSoonSection = () => {
    return (
        <div className="min-h-[400px] flex items-center justify-center bg-black border-t border-white border-opacity-10">
            <div className="w-full px-6 md:px-12 py-24 flex flex-col items-center justify-center">
                <motion.h2
                    className="text-display-large font-heading uppercase leading-none text-white"
                    style={{ letterSpacing: '-0.05em' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    COMING SOON
                </motion.h2>
                <motion.p
                    className="font-mono text-[10px] uppercase tracking-widest text-white text-opacity-80 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    COLLECTION 01 / ARCHIVE INITIALIZING...
                </motion.p>
            </div>
        </div>
    );
};

