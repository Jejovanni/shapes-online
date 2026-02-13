import LogoutButton from '@/components/admin/LogoutButton';
import CopyButton from '@/components/admin/CopyButton'
import { createClient } from '@supabase/supabase-js';
import { updateOrderStatus } from '../actions';
import { CheckCircle, Clock, Package, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch orders
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
    
    // Fetch Top 5 Customers by LTV
    const { data: topCustomers } = await supabase
        .from('customers')
        .select('*')
        .order('total_spent', { ascending: false })
        .limit(5);

    // Calculate Total Revenue from the orders array
    const totalRevenue = orders?.reduce((acc, order) => acc + (order.total_amount || 0), 0) || 0;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Shapes Admin</h1>
                    <p className="text-gray-500 text-sm">Real-time order management & customer insights</p>
                </div>
                <LogoutButton />
            </div>

            {/* LEADERBOARD & STATS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {/* Total Revenue Card */}
                <div className="bg-zinc-900 p-6 rounded-3xl text-white shadow-xl">
                    <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Total Revenue</p>
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
                        <h3 className="text-lg font-bold truncate group-hover:text-pink-600 transition-colors">{customer.email}</h3>
                        <p className="text-2xl font-black text-zinc-900">₦{customer.total_spent.toLocaleString()}</p>
                    </Link>
                ))}
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    Recent Orders
                </h2>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="p-5 font-bold text-xs uppercase text-gray-400">Customer</th>
                            <th className="p-5 font-bold text-xs uppercase text-gray-400">Items</th>
                            <th className="p-5 font-bold text-xs uppercase text-gray-400">Total</th>
                            <th className="p-5 font-bold text-xs uppercase text-gray-400">Proof</th>
                            <th className="p-5 font-bold text-xs uppercase text-gray-400">Status</th>
                            <th className="p-5 font-bold text-xs uppercase text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders?.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="p-5">
                                    <div className="flex items-center gap-2 group/row">
                                        <Link href={`/admin/customers/${order.email}`} className="block">
                                            <div className="font-bold text-gray-900 group-hover/row:text-pink-600 transition-colors">
                                                {order.customer_name}
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium">{order.email}</div>
                                        </Link>
                                        <CopyButton text={order.email} />
                                    </div>
                                </td>
                                <td className="p-5 text-sm text-gray-600 max-w-xs truncate font-medium">
                                    {order.items_summary}
                                </td>
                                <td className="p-5 font-mono font-bold text-zinc-900">
                                    ₦{order.total_amount.toLocaleString()}
                                </td>
                                <td className="p-5">
                                    {order.screenshot_url ? (
                                        <a 
                                            href={order.screenshot_url} 
                                            target="_blank" 
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                                        >
                                            View <ExternalLink size={12} />
                                        </a>
                                    ) : (
                                        <span className="text-gray-300 text-xs font-medium italic">Auto-Paid</span>
                                    )}
                                </td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                        order.status === 'verified' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-amber-100 text-amber-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-5">
                                    {order.status === 'pending' && (
                                        <form action={async () => {
                                            "use server";
                                            await updateOrderStatus(order.id, 'verified');
                                        }}>
                                            <button className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-pink-600 transition-all active:scale-95 shadow-lg shadow-zinc-200">
                                                Verify Payment
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders?.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium">
                        No orders found yet.
                    </div>
                )}
            </div>
        </div>
    );
}