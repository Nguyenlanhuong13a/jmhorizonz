"use client";

import Link from "next/link";
import { SOCIAL_HANDLES } from "@/core/constants";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white text-black w-full max-w-full overflow-x-hidden flex-shrink-0 border-t-2 border-black relative">
            {/* Manifesto Text Block */}
            <div className="px-6 md:px-12 py-16 md:py-24">
                <p 
                    className="font-mono text-sm md:text-base leading-relaxed text-justify max-w-5xl mx-auto"
                    style={{ textAlign: 'justify', textAlignLast: 'left' }}
                >
                    J&M HORIZONZ represents the intersection of brutalist architecture and functional high-fashion. 
                    Founded in New York, we operate as a creative collective dedicated to producing archival-quality 
                    garments that challenge conventional design paradigms. Our philosophy rejects the polished, 
                    symmetric aesthetics of mass-market fashion in favor of raw, hand-coded precision. Each piece 
                    is conceived as a technical artifact—a node in a larger system of intentional design choices. 
                    We believe in <Link href="/privacy" className="bg-yellow-300 px-1 hover:bg-yellow-400 transition-colors inline-block">transparency</Link> and 
                    <Link href="/terms" className="bg-yellow-300 px-1 hover:bg-yellow-400 transition-colors inline-block ml-1">ethical production</Link>, 
                    operating with a commitment to <Link href="/story" className="bg-yellow-300 px-1 hover:bg-yellow-400 transition-colors inline-block ml-1">sustainable practices</Link> 
                    and direct communication with our community. Our collections are released in limited drops, 
                    each representing a moment in time—archived, not discarded. This is not fast fashion. 
                    This is <span className="font-bold">permanent design</span>.
                </p>
            </div>

            {/* Back to Top Button - Giant Arrow (20% of footer) */}
            <div className="border-t-2 border-black flex items-center justify-center" style={{ height: '20vh', minHeight: '120px' }}>
                <button
                    onClick={scrollToTop}
                    className="group flex flex-col items-center gap-2 hover:opacity-60 transition-opacity"
                >
                    <ArrowUp size={48} strokeWidth={1} className="group-hover:-translate-y-2 transition-transform" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">BACK TO TOP</span>
                </button>
            </div>

            {/* Live Ticker at Bottom Edge */}
            <div className="border-t-2 border-black bg-black text-white overflow-hidden">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                    className="flex whitespace-nowrap"
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <span key={`ticker-${i}`} className="font-mono text-[10px] uppercase tracking-widest px-8">
                            NO REFUNDS ON SALE ITEMS // GLOBAL SHIPPING // J&M EXCLUSIVE //
                        </span>
                    ))}
                </motion.div>
            </div>
        </footer>
    );
};
