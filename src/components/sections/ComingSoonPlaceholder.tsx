"use client";

import { motion } from "framer-motion";

export const ComingSoonPlaceholder = () => {
    return (
        <section className="flex-grow flex items-center justify-center bg-[#000] relative overflow-hidden min-h-[60vh]">
            <div className="w-full px-6 md:px-12 py-24 flex flex-col items-center justify-center">
                <motion.h2
                    className="text-[15vw] font-heading uppercase leading-none text-white animate-[flicker_0.15s_ease-in-out_infinite]"
                    style={{ letterSpacing: '-0.05em' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    COMING SOON
                </motion.h2>
                <motion.p
                    className="font-mono text-[12px] uppercase tracking-widest text-white text-opacity-80 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    ARCHIVE INITIALIZING...
                </motion.p>
            </div>
        </section>
    );
};

export default ComingSoonPlaceholder;

