"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";

export function ConditionalFooter() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // During SSR/initial render, always show footer
    if (!mounted) {
        return <Footer />;
    }

    // After mount, check pathname and hide only on auth/admin pages
    if (pathname) {
        const isAuthPage = pathname.startsWith("/auth");
        const isAdminPage = pathname.startsWith("/admin");
        
        if (isAuthPage || isAdminPage) {
            return null;
        }
    }

    // Show footer on all other pages
    return <Footer />;
}

