import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

async function getProfileData(userId: string) {
    const profile = await db.profile.findUnique({
        where: { userId },
        include: {
            user: {
                include: {
                    orders: {
                        include: {
                            items: {
                                include: {
                                    product: true
                                }
                            }
                        },
                        orderBy: { createdAt: "desc" }
                    }
                }
            }
        }
    });
    return profile;
}

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/login");

    const profile = await getProfileData(session.user.id);
    if (!profile) {
        return (
            <main className="bg-[#000] text-white h-screen flex items-center justify-center overflow-hidden">
                <div className="text-center">
                    <p className="font-mono text-[12px] text-[#0F0] uppercase tracking-widest">DATA CORRUPTION: PROFILE NOT FOUND</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-grow bg-[#000] text-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-24">
                {/* Header with Outline Text */}
                <div className="space-y-6 relative">
                    <div className="relative">
                        <h1 
                            className="text-[12vw] font-heading uppercase tracking-tighter leading-none"
                            style={{
                                color: 'transparent',
                                WebkitTextStroke: '1px #FFF',
                                opacity: 0.15
                            } as React.CSSProperties}
                        >
                            ENTITY NODE
                        </h1>
                        <div className="absolute top-0 left-0 flex items-center gap-4">
                            <h1 className="text-[4vw] md:text-[3vw] font-heading uppercase tracking-tighter leading-none text-white">
                                ENTITY NODE
                            </h1>
                            {session.user.role === "ADMIN" && (
                                <div className="border border-white px-4 py-1 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-[#0F0]" />
                                    <span className="font-mono text-[10px] uppercase font-bold text-[#0F0]">ADMIN PRIVILEGES</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white text-opacity-60">
                        IDENTIFICATION: {session.user.email}
                    </p>
                </div>

                {/* 2-Column Asymmetrical Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Entity Parameters */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="border border-white p-8 space-y-8">
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white border-b border-white pb-4">
                                ENTITY PARAMETERS
                            </h3>
                            <ProfileForm initialData={{
                                shippingAddress: profile.shippingAddress || "",
                                bio: profile.bio || ""
                            }} />
                        </div>
                    </div>

                    {/* Right Column - Sequence Archive */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="border border-white p-8 space-y-8">
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white border-b border-white pb-4">
                                SEQUENCE ARCHIVE
                            </h3>

                            {profile.user.orders.length === 0 ? (
                                <div className="py-24 border border-white flex flex-col items-center justify-center gap-4 text-center min-h-[400px]">
                                    <Clock size={32} strokeWidth={1} className="text-white text-opacity-20" />
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-white text-opacity-60">
                                        NO PAST PURCHASE SEQUENCES DETECTED.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {profile.user.orders.map((order) => (
                                        <div key={order.id} className="border border-white p-6 space-y-6 hover:border-opacity-100 border-opacity-50 transition-all">
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-white border-opacity-30 pb-4">
                                                <div className="space-y-1">
                                                    <p className="font-mono text-[8px] text-white text-opacity-40 uppercase tracking-widest">TRACKING SEQUENCE</p>
                                                    <p className="font-mono text-xs font-bold uppercase text-white">{order.trackingId}</p>
                                                </div>
                                                <div className="space-y-1 text-right">
                                                    <p className="font-mono text-[8px] text-white text-opacity-40 uppercase tracking-widest">STATUS</p>
                                                    <p className={`font-mono text-xs font-bold uppercase ${order.status === "DELIVERED" ? "text-[#0F0]" :
                                                            order.status === "SHIPPED" ? "text-white" : "text-white text-opacity-60"
                                                        }`}>{order.status}</p>
                                                </div>
                                                <div className="space-y-1 text-right">
                                                    <p className="font-mono text-[8px] text-white text-opacity-40 uppercase tracking-widest">SYNCHRONIZED</p>
                                                    <p className="font-mono text-xs text-white text-opacity-60 uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex gap-4 items-center">
                                                        <div className="relative w-16 h-20 bg-black border border-white border-opacity-30 flex-shrink-0">
                                                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover grayscale" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-heading uppercase tracking-tight text-white">{item.product.name}</p>
                                                            <p className="font-mono text-[10px] text-white text-opacity-60 uppercase">QTY: {item.quantity} — ${item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-4 border-t border-white border-opacity-30 flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <p className="font-mono text-[8px] text-white text-opacity-40 uppercase tracking-widest">BILLING NODES</p>
                                                    <p className="text-xl font-heading uppercase tracking-tight text-white">${order.totalAmount.toLocaleString()}</p>
                                                </div>
                                                <button className="font-mono text-[10px] uppercase font-bold text-white underline underline-offset-4 hover:text-opacity-60 transition-opacity">
                                                    DETAILS
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
