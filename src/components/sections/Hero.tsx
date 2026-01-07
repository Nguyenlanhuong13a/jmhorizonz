"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 200]);
    const [isMobile, setIsMobile] = useState(false);
    
    // Track intro completion
    const introProgress = useMotionValue(0);
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        
        const updateIntroProgress = () => {
            const scrollHeight = window.innerHeight * (isMobile ? 2.5 : 4);
            const progress = Math.min(window.scrollY / scrollHeight, 1);
            introProgress.set(progress);
        };
        
        updateIntroProgress();
        window.addEventListener("scroll", updateIntroProgress, { passive: true });
        
        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", updateIntroProgress);
        };
    }, [isMobile, introProgress]);

    // Hero animates in when intro progress > 0.9
    const heroOpacity = useTransform(introProgress, [0.9, 1.0], [0, 1]);
    const heroY = useTransform(introProgress, [0.9, 1.0], [100, 0]);

    return (
        <motion.section 
            className="relative min-h-[90vh] flex flex-col pt-0 overflow-hidden bg-white text-black"
            style={{
                opacity: heroOpacity,
                y: heroY,
                willChange: "transform, opacity",
            }}
        >
            {/* Massive Title Layer */}
            <div className="relative z-10 w-full px-6 md:px-12 pt-24 mix-blend-difference text-white">
                <h1 className="text-hero font-heading leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
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
            <div className="absolute bottom-12 left-6 md:left-12 z-20">
                <button className="px-8 py-4 bg-black text-white font-body text-xs uppercase tracking-widest border border-black hover-invert">
                    Explore New Drops
                </button>
            </div>
        </motion.section>
    );
};
