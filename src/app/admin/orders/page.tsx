import { db } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { ShoppingBag, Truck, CheckCircle, Clock } from "lucide-react";
import { StatusSelect } from "@/components/admin/StatusSelect";

async function getOrders() {
    return await db.order.findMany({
        include: {
            user: {
                select: { name: true, email: true }
            }
        },
        orderBy: { createdAt: "desc" },
    });
}

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    const statusIcons: Record<string, React.ReactNode> = {
        PENDING: <Clock size={14} className="text-orange-500" />,
        SHIPPED: <Truck size={14} className="text-blue-500" />,
        DELIVERED: <CheckCircle size={14} className="text-green-500" />,
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-heading uppercase tracking-tighter mb-4">Orders</h1>
                <p className="font-mono text-xs uppercase tracking-widest opacity-40">Monitor & Synchronize Logistics</p>
            </div>

            <div className="bg-white border border-black overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black font-mono text-[10px] uppercase tracking-[0.2em] bg-neutral-50">
                            <th className="p-6 font-bold">Tracking ID</th>
                            <th className="p-6 font-bold">Customer</th>
                            <th className="p-6 font-bold">Amount</th>
                            <th className="p-6 font-bold">Status</th>
                            <th className="p-6 font-bold">Date</th>
                            <th className="p-6 font-bold text-right">Sequence</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-24 text-center">
                                    <div className="flex flex-col items-center gap-4 opacity-20">
                                        <ShoppingBag size={48} strokeWidth={1} />
                                        <p className="font-mono text-xs uppercase tracking-widest text-black">No order sequences initiated.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-neutral-50/50 transition-colors">
                                    <td className="p-6">
                                        <span className="font-mono text-xs font-bold uppercase">{order.trackingId}</span>
                                    </td>
                                    <td className="p-6">
                                        <div>
                                            <p className="font-bold text-sm uppercase tracking-tight">{order.user.name || "UNIDENTIFIED"}</p>
                                            <p className="font-mono text-[8px] opacity-40 uppercase tracking-widest">{order.user.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-6 font-mono text-xs font-bold">
                                        ${order.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            {statusIcons[order.status]}
                                            <span className="font-mono text-[10px] uppercase tracking-widest">{order.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="font-mono text-[10px] opacity-60 uppercase">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <StatusSelect orderId={order.id} initialStatus={order.status} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
