"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="flex-grow bg-white text-black flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-2xl w-full"
            >
                <div className="mb-12">
                    <h1 className="text-[15vw] font-heading leading-none tracking-tighter opacity-10">404</h1>
                    <div className="relative -mt-[10vw]">
                        <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-tighter mb-4">
                            PROTOCOL ERROR
                        </h2>
                        <div className="w-12 h-1 bg-black mx-auto mb-8" />
                        <p className="font-mono text-[10px] md:text-sm uppercase tracking-[0.3em] opacity-60 max-w-md mx-auto leading-relaxed">
                            The requested neural node is currently inaccessible or has been purged from the central archive.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="p-8 border border-black/10 bg-neutral-50 flex flex-col items-center justify-center space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Error Code: [ Purged ]</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <div className="p-8 border border-black flex flex-col items-center justify-center space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">System Status</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-green-600 font-bold">Grid Central Online</span>
                    </div>
                </div>

                <Link
                    href="/"
                    className="inline-block border border-black px-12 py-6 bg-black text-white font-mono text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
                >
                    Return to Grid — 0.0.1
                </Link>
            </motion.div>

            {/* Brutalist Decorative Elements */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-black group-hover:h-2 transition-all" />
            <div className="fixed top-0 left-0 h-full w-1 bg-black" />
            <div className="fixed top-0 right-0 h-full w-1 bg-black" />
        </main>
    );
}
