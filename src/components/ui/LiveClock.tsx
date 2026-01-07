"use client";

import { useState, useEffect } from "react";

export const LiveClock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const pstTime = now.toLocaleTimeString("en-US", {
                timeZone: "America/Los_Angeles",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
            setTime(pstTime);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    return <span className="font-mono tabular-nums">{time} PST</span>;
};
