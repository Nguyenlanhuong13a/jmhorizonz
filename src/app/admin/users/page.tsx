import { getUsers } from "@/lib/actions/users";
export const dynamic = 'force-dynamic';
import { Users, Shield, User as UserIcon } from "lucide-react";
import { RoleToggle } from "@/components/admin/RoleToggle";

export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-heading uppercase tracking-tighter mb-4">Users</h1>
                <p className="font-mono text-xs uppercase tracking-widest opacity-40">Entity Records & Permission Gates</p>
            </div>

            <div className="bg-white border border-black overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black font-mono text-[10px] uppercase tracking-[0.2em] bg-neutral-50">
                            <th className="p-6 font-bold">Entity Index</th>
                            <th className="p-6 font-bold">Identification</th>
                            <th className="p-6 font-bold">Permission</th>
                            <th className="p-6 font-bold">Synchronized</th>
                            <th className="p-6 font-bold text-right">Access Control</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-neutral-50/50 transition-colors">
                                <td className="p-6">
                                    <span className="font-mono text-[10px] opacity-40 uppercase">{user.id.slice(-8)}</span>
                                </td>
                                <td className="p-6">
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-tight">{user.name || "UNNAMED_ENTITY"}</p>
                                        <p className="font-mono text-[8px] opacity-40 uppercase tracking-widest">{user.email}</p>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2">
                                        {user.role === "ADMIN" ? (
                                            <Shield size={12} className="text-purple-600" />
                                        ) : (
                                            <UserIcon size={12} className="opacity-40" />
                                        )}
                                        <span className={`font-mono text-[10px] uppercase tracking-widest ${user.role === "ADMIN" ? "text-purple-600 font-bold" : "opacity-60"}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="font-mono text-[10px] uppercase opacity-40">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <RoleToggle userId={user.id} currentRole={user.role} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
