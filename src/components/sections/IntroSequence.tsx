"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface IntroSequenceProps {
  products?: any[];
}

// Separate component for each phrase to avoid hooks in map
interface PhraseProps {
  phrase: string;
  index: number;
  stage2Progress: any;
  offsets: { x: number[]; y: number[] };
}

const Phrase = ({ phrase, index, stage2Progress, offsets }: PhraseProps) => {
  const phraseStart = index * 0.2;
  const phraseMid = phraseStart + 0.1;
  const phraseEnd = phraseStart + 0.2;
  
  const phraseXPercent = useTransform(
    stage2Progress,
    [phraseStart, phraseMid, phraseEnd],
    offsets.x.map(v => `${v}%`)
  );
  const phraseYPercent = useTransform(
    stage2Progress,
    [phraseStart, phraseMid, phraseEnd],
    offsets.y.map(v => `${v}%`)
  );
  const phraseOpacity = useTransform(
    stage2Progress,
    [phraseStart, phraseStart + 0.05, phraseMid, phraseEnd + 0.1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        x: phraseXPercent,
        y: phraseYPercent,
        opacity: phraseOpacity,
        mixBlendMode: "difference",
        willChange: "transform, opacity",
      }}
    >
      <span
        className="font-heading text-white uppercase tracking-tighter"
        style={{
          fontSize: "clamp(4rem, 20vw, 16rem)",
          fontWeight: 900,
        }}
      >
        {phrase}
      </span>
    </motion.div>
  );
};

export const IntroSequence = ({ products = [] }: IntroSequenceProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detect mobile - only on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll progress - track scroll accurately
  const [mounted, setMounted] = useState(false);
  const scrollProgress = useMotionValue(0);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    
    const updateProgress = () => {
      // Calculate scroll height based on viewport
      const scrollHeight = window.innerHeight * (isMobile ? 2.5 : 4);
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(Math.max(currentScroll / scrollHeight, 0), 1);
      scrollProgress.set(progress);
    };
    
    // Initial update
    updateProgress();
    
    // Update on scroll with requestAnimationFrame for smooth updates
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    
    // Update when mobile state changes
    const timeoutId = setTimeout(updateProgress, 200);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [isMobile, scrollProgress]);
  
  const sequenceProgress = scrollProgress;

  // Stage 1: THE GATE [0.0 - 0.25] - Logo scales aggressively
  const stage1Progress = useTransform(sequenceProgress, [0, 0.25], [0, 1]);
  const logoScale = useTransform(
    stage1Progress,
    [0, 1],
    isMobile ? [1, 15] : [1, 50]
  );
  // Logo fades out near the end of stage 1, but starts fully visible
  const logoOpacity = useTransform(sequenceProgress, [0, 0.2, 0.25], [1, 1, 0]);

  // Stage 2: THE VOID [0.25 - 0.60] - Text phrases fly in
  const stage2Progress = useTransform(sequenceProgress, [0.25, 0.60], [0, 1]);
  const voidOpacity = useTransform(
    sequenceProgress,
    [0.25, 0.30, 0.55, 0.60],
    [0, 1, 1, 0]
  );

  // Stage 3: THE SCAN [0.60 - 0.85] - Scanning line with grid
  const stage3Progress = useTransform(sequenceProgress, [0.60, 0.85], [0, 1]);
  const scanLineY = useTransform(stage3Progress, [0, 1], ["-10%", "110%"]);
  const gridOpacity = useTransform(
    sequenceProgress,
    [0.60, 0.68, 0.77, 0.85],
    [0, 1, 1, 0]
  );

  // Stage 4: ARRIVAL [0.85 - 1.0] - Slide up to reveal Hero
  const stage4Progress = useTransform(sequenceProgress, [0.85, 1.0], [0, 1]);
  // Slide the entire intro container up to reveal content below
  const introTranslateY = useTransform(stage4Progress, [0, 1], ["0%", "-100%"]);

  // Text phrases for Stage 2
  const phrases = ["SYSTEM", "CHAOS", "CONTROL", "ORDER", "VOID"];
  const phraseOffsets = [
    { x: [-100, 0, 100], y: [-30, 0, 30] },
    { x: [100, 0, -100], y: [30, 0, -30] },
    { x: [-80, 0, 80], y: [50, 0, -50] },
    { x: [90, 0, -90], y: [-40, 0, 40] },
    { x: [-70, 0, 70], y: [60, 0, -60] },
  ];

  const handleSkip = () => {
    if (typeof window === "undefined") return;
    const scrollTarget = window.innerHeight * (isMobile ? 2.5 : 4);
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="sticky top-0 h-screen overflow-hidden bg-black z-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="font-heading text-white uppercase tracking-tighter"
            style={{
              fontSize: "clamp(3rem, 15vw, 12rem)",
              mixBlendMode: "difference",
            }}
          >
            J&M
            <br />
            HORIZONZ
          </h1>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="sticky top-0 h-screen overflow-hidden bg-black z-50"
      style={{ 
        willChange: "transform",
        y: introTranslateY,
      }}
    >
      {/* Skip Button - Mobile optimized */}
      <button
        onClick={handleSkip}
        className="fixed bottom-6 right-6 z-[60] px-4 py-2 bg-black border border-white text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all md:bottom-8 md:right-8"
      >
        SKIP &gt;&gt;
      </button>

      {/* Stage 1: THE GATE - Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{
          opacity: logoOpacity,
          scale: logoScale,
          willChange: "transform, opacity",
        }}
      >
        <h1
          className="font-heading text-white uppercase tracking-tighter"
          style={{
            fontSize: "clamp(3rem, 15vw, 12rem)",
            color: "white",
            textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          }}
        >
          J&M
          <br />
          HORIZONZ
        </h1>
      </motion.div>

      {/* Stage 2: THE VOID - Text phrases */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          opacity: voidOpacity,
          willChange: "opacity",
        }}
      >
        {phrases.map((phrase, index) => {
          const offsets = phraseOffsets[index % phraseOffsets.length];
          return (
            <Phrase
              key={phrase}
              phrase={phrase}
              index={index}
              stage2Progress={stage2Progress}
              offsets={offsets}
            />
          );
        })}
      </motion.div>

      {/* Stage 3: THE SCAN - Scanning line with product grid */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          opacity: gridOpacity,
          willChange: "opacity",
        }}
      >
        {/* Product Grid Background - Flickering */}
        <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-30">
          {products.slice(0, 12).map((product, idx) => {
            // Use index-based delays to avoid hydration mismatch
            const delay = (idx * 0.05) % 0.5;
            const duration = 0.15 + (idx % 3) * 0.03;
            return (
            <motion.div
              key={product.id || idx}
              className="relative aspect-square bg-neutral-900 border border-white/10 overflow-hidden"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            >
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale"
                />
              )}
            </motion.div>
            );
          })}
        </div>

        {/* Scanning Line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-white z-10"
          style={{
            y: scanLineY,
            willChange: "transform",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
          }}
        />
      </motion.div>

    </motion.div>
  );
};

