import { db } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { Package, ShoppingBag, Users, Coins } from "lucide-react";

async function getStats() {
    const [productCount, orderCount, userCount, orders] = await Promise.all([
        db.product.count(),
        db.order.count(),
        db.user.count(),
        db.order.findMany({
            select: { totalAmount: true }
        })
    ]);

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    return {
        productCount,
        orderCount,
        userCount,
        totalRevenue
    };
}

export default async function AdminDashboardPage() {
    const stats = await getStats();

    const metrics = [
        { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: Coins, color: "text-green-600" },
        { label: "Active Nodes", value: stats.productCount, icon: Package, color: "text-blue-600" },
        { label: "Order Logs", value: stats.orderCount, icon: ShoppingBag, color: "text-orange-600" },
        { label: "Entity Data", value: stats.userCount, icon: Users, color: "text-purple-600" },
    ];

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-heading uppercase tracking-tighter mb-4">Command Center</h1>
                <p className="font-mono text-xs uppercase tracking-widest opacity-40">System Overview & Global Metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((m) => {
                    const Icon = m.icon;
                    return (
                        <div key={m.label} className="bg-white border border-black p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <Icon size={24} className={m.color} strokeWidth={1.5} />
                                <span className="font-mono text-[8px] uppercase tracking-widest opacity-20">RT-DATA</span>
                            </div>
                            <div>
                                <p className="font-mono text-[10px] uppercase opacity-40 mb-1">{m.label}</p>
                                <p className="text-3xl font-heading uppercase tracking-tight">{m.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Placeholder */}
                <div className="bg-white border border-black p-8 space-y-8">
                    <h3 className="font-mono text-xs uppercase tracking-widest border-b border-black pb-4">Neural Activity Logs</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                    <span className="font-mono text-[10px] uppercase">Node Sequence Updated</span>
                                </div>
                                <span className="font-mono text-[8px] opacity-40">2M AGO</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-black p-8 space-y-8">
                    <h3 className="font-mono text-xs uppercase tracking-widest border-b border-black pb-4">Protocol Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-black/10 bg-neutral-50">
                            <p className="font-mono text-[8px] opacity-40 mb-1">DB SYNC</p>
                            <p className="font-mono text-[10px] font-bold text-green-600">STABLE</p>
                        </div>
                        <div className="p-4 border border-black/10 bg-neutral-50">
                            <p className="font-mono text-[8px] opacity-40 mb-1">AUTH GATE</p>
                            <p className="font-mono text-[10px] font-bold text-green-600">ACTIVE</p>
                        </div>
                        <div className="p-4 border border-black/10 bg-neutral-50">
                            <p className="font-mono text-[8px] opacity-40 mb-1">API BRIDGE</p>
                            <p className="font-mono text-[10px] font-bold text-orange-500">OPTIMIZING</p>
                        </div>
                        <div className="p-4 border border-black/10 bg-neutral-50">
                            <p className="font-mono text-[8px] opacity-40 mb-1">NEON ADAPTER</p>
                            <p className="font-mono text-[10px] font-bold text-blue-600">EDGE_ENABLED</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
