"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <section className="relative min-h-[90vh] flex flex-col pt-0 overflow-hidden bg-white text-black">
            {/* Massive Title Layer */}
            <div className="relative z-10 w-full px-6 pt-24 mix-blend-difference text-white">
                <h1 className="text-[12vw] font-heading leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
                    CONCRETE<br />
                    DREAMS<br />
                    OF TOMORROW
                </h1>
            </div>

            {/* Parallax Image Layer */}
            <motion.div
                style={{ y }}
                className="absolute top-0 right-0 w-2/3 h-full z-0 grayscale contrast-125"
            >
                <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop"
                    alt="Swiss Hero"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Call to Action */}
            <div className="absolute bottom-12 left-6 z-20">
                <button className="px-8 py-4 bg-black text-white font-body text-xs uppercase tracking-widest border border-black hover-invert">
                    Explore New Drops
                </button>
            </div>
        </section>
    );
};
