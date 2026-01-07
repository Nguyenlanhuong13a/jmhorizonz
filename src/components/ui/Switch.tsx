"use client";

import React from "react";
import { cn } from "@/core/utils/cn";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

export const Switch = ({ checked, onCheckedChange, className }: SwitchProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-black",
                checked ? "bg-black" : "bg-neutral-200",
                className
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    checked ? "translate-x-5" : "translate-x-1"
                )}
            />
        </button>
    );
};
