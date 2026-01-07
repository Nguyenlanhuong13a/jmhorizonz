"use client";

import { useEffect, useState } from "react";

export const ClientOnly = ({ 
    children, 
    fallback 
}: { 
    children: React.ReactNode;
    fallback?: React.ReactNode;
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return fallback ? <>{fallback}</> : null;
    }

    return <>{children}</>;
};
