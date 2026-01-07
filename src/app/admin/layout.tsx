"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Package,
    ShoppingCart,
    Users,
    LayoutDashboard,
    LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Inventory", href: "/admin/inventory", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-black text-white flex flex-col fixed inset-y-0 left-0">
                <div className="p-8 border-b border-white/10">
                    <Link href="/" className="font-heading text-xl tracking-tighter hover:opacity-80 transition-opacity">
                        J&M ADMIN
                    </Link>
                    <p className="font-mono text-[8px] uppercase tracking-[0.4em] opacity-40 mt-2">
                        Protocol v0.1
                    </p>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-4 px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors ${isActive
                                        ? "bg-white text-black font-bold"
                                        : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <Icon size={16} strokeWidth={1.5} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-4 px-4 py-3 font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity w-full"
                    >
                        <LogOut size={16} strokeWidth={1.5} />
                        Terminate
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-12">
                {children}
            </main>
        </div>
    );
}
