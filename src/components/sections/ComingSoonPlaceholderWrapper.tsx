"use client";

import dynamic from "next/dynamic";

const ComingSoonPlaceholder = dynamic(
    () => import("@/components/sections/ComingSoonPlaceholder").then(mod => ({ default: mod.ComingSoonPlaceholder })),
    { ssr: false }
);

export default function ComingSoonPlaceholderWrapper() {
    return <ComingSoonPlaceholder />;
}

