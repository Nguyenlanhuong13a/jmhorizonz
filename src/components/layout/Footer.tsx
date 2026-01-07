"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SOCIAL_HANDLES } from "@/core/constants";
import { useEffect, useState } from "react";

export const Footer = () => {
    const [time, setTime] = useState("");
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);

        const updateClock = () => {
            const now = new Date();
            const pst = now.toLocaleTimeString("en-US", {
                timeZone: "America/Los_Angeles",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
            setTime(pst);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12 w-full max-w-full overflow-x-hidden flex-shrink-0">
            {/* Massive Logo Marquee */}
            <div className="w-full border-b border-white/10 mb-24 pb-12 relative" style={{ overflow: 'hidden', maxWidth: '100%' }}>
                <div className="relative" style={{ overflow: 'hidden', width: '100%' }}>
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30,
                        }}
                        className="flex whitespace-nowrap"
                        style={{ willChange: 'transform' }}
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <h2 key={`footer-marquee-${i}`} className="text-[8vw] md:text-[6vw] font-serif leading-none tracking-[-0.1em] uppercase pr-12 md:pr-24 flex-shrink-0">
                                J&M HORIZONZ — J&M HORIZONZ —
                            </h2>
                        ))}
                    </motion.div>
                </div>
                {/* Spacer to maintain height */}
                <div className="invisible pointer-events-none absolute top-0 left-0">
                    <h2 className="text-[8vw] md:text-[6vw] font-serif leading-none tracking-[-0.1em] uppercase">
                        J&M HORIZONZ — J&M HORIZONZ —
                    </h2>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="md:w-1/2 space-y-8">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] max-w-sm opacity-60">
                        A New York based creative collective focusing on the intersection of brutalist architecture and functional high-fashion.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-widest">SYSTEM STATUS: ONLINE</span>
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">
                            LOCAL TIME (PST): {hasMounted ? time : "--:--:--"}
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 grid grid-cols-2 gap-12 self-end">
                    <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest mb-6 opacity-40">Navigation</h4>
                        <ul className="space-y-4">
                            {["Shop", "Collections", "Archive", "Manifesto"].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase()}`} className="text-sm font-serif hover:italic transition-all">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-mono uppercase tracking-widest mb-6 opacity-40">Connect</h4>
                        <ul className="space-y-4">
                            {SOCIAL_HANDLES.map((social) => (
                                <li key={social.platform}>
                                    <Link href={social.url} className="text-[10px] font-mono uppercase tracking-widest hover:opacity-50 transition-opacity">
                                        {social.platform} — {social.handle}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[8px] font-mono uppercase tracking-[0.3em] opacity-40">
                    © 2026 J&M HORIZONZ. ALL RIGHTS RESERVED.
                </p>
                <div className="flex space-x-8 opacity-40">
                    <Link href="#" className="text-[8px] font-mono uppercase tracking-widest hover:opacity-100">Privacy</Link>
                    <Link href="#" className="text-[8px] font-mono uppercase tracking-widest hover:opacity-100">Terms</Link>
                </div>
            </div>
        </footer>
    );
};
