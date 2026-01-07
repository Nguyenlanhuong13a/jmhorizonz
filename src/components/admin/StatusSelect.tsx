"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import { Loader2 } from "lucide-react";

export const StatusSelect = ({
    orderId,
    initialStatus
}: {
    orderId: string,
    initialStatus: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
        setIsLoading(true);
        await updateOrderStatus(orderId, newStatus);
        setIsLoading(false);
    };

    return (
        <div className="flex items-center gap-3 justify-end font-mono">
            {isLoading && <Loader2 className="animate-spin" size={12} />}
            <select
                defaultValue={initialStatus}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-transparent border border-black p-2 text-[8px] uppercase tracking-widest outline-none disabled:opacity-20 transition-opacity"
            >
                <option value="PENDING">SET_PENDING</option>
                <option value="SHIPPED">SET_SHIPPED</option>
                <option value="DELIVERED">SET_DELIVERED</option>
                <option value="CANCELLED">SET_CANCELLED</option>
            </select>
        </div>
    );
};
