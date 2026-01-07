"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CollectionsPaginationProps {
    currentPage: number;
    totalPages: number;
    total: number;
}

export function CollectionsPagination({ currentPage, totalPages, total }: CollectionsPaginationProps) {
    const router = useRouter();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            router.push(`/collections?page=${newPage}`);
        }
    };

    return (
        <div className="border-t border-black pt-12 pb-24 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                Showing {Math.min((currentPage - 1) * 12 + 1, total)} - {Math.min(currentPage * 12, total)} of {total} nodes
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 border border-black px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none"
                >
                    <ChevronLeft size={14} />
                    Previous
                </button>

                <div className="font-mono text-[10px] font-bold">
                    {currentPage} / {totalPages}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 border border-black px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none"
                >
                    Next
                    <ChevronRight size={14} />
                </button>
            </div>

            <div className="hidden md:block">
                <Link href="/shop" className="text-[10px] font-mono uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
                    Recalibrate Search
                </Link>
            </div>
        </div>
    );
}

