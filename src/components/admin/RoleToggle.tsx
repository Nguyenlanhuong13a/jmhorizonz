"use client";

import { useState } from "react";
import { toggleUserRole } from "@/lib/actions/users";
import { Loader2 } from "lucide-react";

export const RoleToggle = ({ userId, currentRole }: { userId: string, currentRole: string }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        await toggleUserRole(userId);
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className="border border-black px-4 py-2 font-mono text-[8px] uppercase tracking-tighter hover:bg-black hover:text-white transition-all disabled:opacity-20 inline-flex items-center gap-2"
        >
            {isLoading && <Loader2 className="animate-spin" size={10} />}
            {currentRole === "ADMIN" ? "DEMOTE_TO_USER" : "PROMOTE_TO_ADMIN"}
        </button>
    );
};
