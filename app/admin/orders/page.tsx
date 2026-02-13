import LogoutButton from '@/components/admin/LogoutButton';
import CopyButton from '@/components/admin/CopyButton'
import { createClient } from '@supabase/supabase-js';
import { updateOrderStatus } from '../actions';
import { CheckCircle, Clock, Package, ExternalLink, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
    // Moved initialization inside to prevent build-time secret leaks
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data: logs } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    const { data: topCustomers } = await supabase
        .from('customers')
        .select('*')
        .order('total_spent', { ascending: false })
        .limit(5);

    const totalRevenue = orders?.reduce((acc, order) => acc + (order.total_amount || 0), 0) || 0;

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Shapes Admin</h1>
                    <p className="text-gray-500 text-xs md:text-sm">Real-time order management & insights</p>
                </div>
                <LogoutButton />
            </div>
            

            {/* LEADERBOARD & STATS SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                {/* Total Revenue Card */}
                <div className="bg-zinc-900 p-6 rounded-3xl text-white shadow-xl">
                    <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Total Revenue</p>
                        <TrendingUp size={16} className="text-pink-400" />
                    </div>
                    <h3 className="text-3xl font-black">₦{totalRevenue.toLocaleString()}</h3>
                    <p className="text-zinc-500 text-xs mt-2">{orders?.length || 0} total sales</p>
                </div>

                {/* Top 3 Customers Cards */}
                {topCustomers?.slice(0, 3).map((customer, index) => (
                    <Link
                        key={customer.email}
                        href={`/admin/customers/${encodeURIComponent(customer.email)}`}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-pink-300 transition-all group"
                    >
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Top Customer #{index + 1}</p>
                        <h3 className="text-sm font-bold truncate group-hover:text-pink-600 transition-colors mb-1">{customer.email}</h3>
                        <p className="text-xl font-black text-zinc-900">₦{customer.total_spent.toLocaleString()}</p>
                    </Link>
                ))}
            </div>
            

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    Recent Orders
                </h2>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto"> {/* This allows horizontal scroll on mobile if needed */}
                    <table className="w-full text-left min-w-[800px] md:min-w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Customer</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400 hidden lg:table-cell">Items</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Total</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400 hidden sm:table-cell">Proof</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Status</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders?.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="p-4 md:p-5">
                                        <div className="flex items-center gap-2 group/row">
                                            <Link href={`/admin/customers/${order.email}`} className="block max-w-[120px] md:max-w-none">
                                                <div className="font-bold text-sm md:text-base text-gray-900 truncate group-hover/row:text-pink-600 transition-colors">
                                                    {order.customer_name}
                                                </div>
                                                <div className="text-[10px] md:text-xs text-gray-500 font-medium truncate">{order.email}</div>
                                            </Link>
                                            <CopyButton text={order.email} />
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-5 text-sm text-gray-600 max-w-xs truncate font-medium hidden lg:table-cell">
                                        {order.items_summary}
                                    </td>
                                    <td className="p-4 md:p-5 font-mono font-bold text-zinc-900 text-sm md:text-base">
                                        ₦{order.total_amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 md:p-5 hidden sm:table-cell">
                                        {order.screenshot_url ? (
                                            <a
                                                href={order.screenshot_url}
                                                target="_blank"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-100 transition-colors"
                                            >
                                                View <ExternalLink size={10} />
                                            </a>
                                        ) : (
                                            <span className="text-gray-300 text-[10px] font-medium italic">Auto-Paid</span>
                                        )}
                                    </td>
                                    <td className="p-4 md:p-5">
                                        <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase ${order.status === 'verified'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 md:p-5 text-right">
                                        {order.status === 'pending' && (
                                            <form action={async () => {
                                                "use server";
                                                await updateOrderStatus(order.id, 'verified');
                                            }}>
                                                <button className="bg-zinc-900 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold hover:bg-pink-600 transition-all active:scale-95 shadow-md shadow-zinc-200">
                                                    Verify
                                                </button>
                                            </form>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {orders?.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium">
                        No orders found yet.
                    </div>
                )}
            </div>
            {/* NEW ACTIVITY FEED SECTION */}
            <div className="mt-12 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="text-gray-400" size={20} />
                        System Log
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {logs?.map((log) => (
                            <div key={log.id} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${log.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                                            {log.action_type.replace('_', ' ')}
                                        </p>
                                        <p className="text-xs text-gray-500">{log.details}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:text-right">
                                    <div className="hidden md:block">
                                        <p className="text-[10px] text-gray-400 font-medium uppercase">Admin</p>
                                        <p className="text-xs text-gray-600 font-medium">{log.admin_email}</p>
                                    </div>
                                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                                        <p className="text-[10px] font-bold text-gray-500 italic">
                                            {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {logs?.length === 0 && (
                            <div className="p-10 text-center text-gray-400 text-sm italic">
                                No activity recorded yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}