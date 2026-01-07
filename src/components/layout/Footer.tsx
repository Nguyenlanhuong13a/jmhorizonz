"use client";

import Link from "next/link";
import { SOCIAL_HANDLES } from "@/core/constants";
import { useEffect, useState } from "react";
import { LiveClock } from "@/components/ui/LiveClock";

export const Footer = () => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <footer className="bg-white text-black pt-12 pb-6 px-6 md:px-12 w-full max-w-full overflow-x-hidden flex-shrink-0 border-t border-black">
            {/* 4-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-b border-black pb-8 mb-8">
                {/* Col 1: OPS */}
                <div className="border-r-0 md:border-r border-black pr-0 md:pr-6 pb-6 md:pb-0">
                    <h4 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold">OPS</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/shop" className="font-mono text-[10px] uppercase tracking-widest hover:underline">
                                SHOP
                            </Link>
                        </li>
                        <li>
                            <Link href="/archive" className="font-mono text-[10px] uppercase tracking-widest hover:underline">
                                ARCHIVE
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Col 2: LEGAL */}
                <div className="border-r-0 md:border-r border-black pr-0 md:pr-6 pb-6 md:pb-0">
                    <h4 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold">LEGAL</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/privacy" className="font-mono text-[10px] uppercase tracking-widest hover:underline">
                                PRIVACY
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="font-mono text-[10px] uppercase tracking-widest hover:underline">
                                TERMS
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Col 3: COMM */}
                <div className="border-r-0 md:border-r border-black pr-0 md:pr-6 pb-6 md:pb-0">
                    <h4 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold">COMM</h4>
                    <ul className="space-y-2">
                        {SOCIAL_HANDLES.map((social) => (
                            <li key={social.platform}>
                                <span className="font-mono text-[10px] uppercase tracking-widest">
                                    {social.platform}: {social.handle}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4: STATUS */}
                <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest mb-4 font-bold">STATUS</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#00FF00] block" style={{ boxShadow: '0 0 8px #00FF00' }} />
                            <span className="font-mono text-[10px] uppercase tracking-widest">SERVER: STABLE</span>
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-widest">
                            {hasMounted ? <LiveClock /> : '--:--:-- PST'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Massive Footer Logo */}
            <div className="w-full overflow-hidden">
                <h2 
                    className="font-heading uppercase tracking-tighter leading-none text-center"
                    style={{ fontSize: 'clamp(2rem, 15vw, 20rem)' }}
                >
                    J&M HORIZONZ
                </h2>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-black">
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-60 text-center">
                    © 2026 J&M HORIZONZ. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
};
