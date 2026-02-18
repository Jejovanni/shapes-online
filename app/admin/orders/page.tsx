import SearchBar from '@/components/admin/SearchBar';
import LogoutButton from '@/components/admin/LogoutButton';
import CopyButton from '@/components/admin/CopyButton'
import { createClient } from '@supabase/supabase-js';
import { updateOrderStatus } from '../actions';
import { Clock, ExternalLink, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// --- TYPES ---
interface Order {
    id: string;
    created_at: string;
    customer_name: string;
    email: string;
    items_summary: string;
    total_amount: number;
    screenshot_url: string | null;
    status: 'pending' | 'verified' | 'shipped' | 'cancelled';
}

interface Customer {
    email: string;
    total_spent: number;
}

interface ActivityLog {
    id: string;
    action_type: string;
    details: string;
    status: 'SUCCESS' | 'FAILURE';
    admin_email: string;
    created_at: string;
}

export default async function AdminDashboard(props: {
    searchParams: Promise<{ page?: string; search?: string }>;
}) {
    const searchParams = await props.searchParams;
    const searchTerm = searchParams.search || ''; 
    const currentPage = parseInt(searchParams.page || '1');
    const pageSize = 20;
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Fetch Logs (Strict Typing)
    const { data: logs } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5) as { data: ActivityLog[] | null };

    // 2. Fetch Orders
    let query = supabase.from('orders').select('*', { count: 'exact' });

    if (searchTerm) {
        query = query.or(`customer_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
    }

    const { data: orders, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to) as { data: Order[] | null; count: number | null };

    // 3. Fetch Top Customers (Safely handle empty tables)
    const { data: topCustomers } = await supabase
        .from('customers')
        .select('email, total_spent')
        .order('total_spent', { ascending: false })
        .limit(5) as { data: Customer[] | null };

    // Calculation Fix: Ensure total_amount is treated as a number
    const totalRevenue = orders?.reduce((acc, order) => acc + (Number(order.total_amount) || 0), 0) || 0;
    const totalPages = Math.ceil((count || 0) / pageSize);

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Shapes Admin</h1>
                    <p className="text-gray-500 text-xs md:text-sm">Manual verification workflow active</p>
                </div>
                <LogoutButton />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                <div className="bg-zinc-900 p-6 rounded-3xl text-white shadow-xl">
                    <div className="flex justify-between items-start">
                        <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Page Revenue</p>
                        <TrendingUp size={16} className="text-pink-400" />
                    </div>
                    <h3 className="text-3xl font-black">₦{totalRevenue.toLocaleString()}</h3>
                    <p className="text-zinc-500 text-xs mt-2">{count || 0} total orders</p>
                </div>

                {topCustomers && topCustomers.length > 0 ? (
                    topCustomers.slice(0, 3).map((customer, index) => (
                        <Link
                            key={customer.email}
                            href={`/admin/customers/${encodeURIComponent(customer.email)}`}
                            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-pink-300 transition-all group"
                        >
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Top Customer #{index + 1}</p>
                            <h3 className="text-sm font-bold truncate group-hover:text-pink-600 transition-colors mb-1">{customer.email}</h3>
                            <p className="text-xl font-black text-zinc-900">₦{customer.total_spent.toLocaleString()}</p>
                        </Link>
                    ))
                ) : (
                    <div className="bg-white p-6 rounded-3xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs text-center italic">
                        No customer data yet
                    </div>
                )}
            </div>

            <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                Order Queue
            </h2>
            <div className="mb-6"><SearchBar /></div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px] md:min-w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Customer</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Items</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Total</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Proof</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400">Status</th>
                                <th className="p-4 md:p-5 font-bold text-xs uppercase text-gray-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders?.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="p-4 md:p-5">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <div className="font-bold text-sm text-gray-900">{order.customer_name}</div>
                                                <div className="text-[10px] text-gray-500">{order.email}</div>
                                            </div>
                                            <CopyButton text={order.email} />
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-5 text-sm text-gray-600 max-w-xs truncate font-medium">
                                        {order.items_summary}
                                    </td>
                                    <td className="p-4 md:p-5 font-mono font-bold text-zinc-900">
                                        ₦{Number(order.total_amount).toLocaleString()}
                                    </td>
                                    <td className="p-4 md:p-5">
                                        {order.screenshot_url ? (
                                            <a href={order.screenshot_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg text-[10px] font-bold hover:bg-pink-100 transition-colors">
                                                View Receipt <ExternalLink size={10} />
                                            </a>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-400 text-[10px] font-bold">
                                                <AlertCircle size={10} /> Missing
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 md:p-5">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                            order.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {order.status === 'verified' && <CheckCircle size={10} />}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 md:p-5 text-right">
                                        {order.status === 'pending' && (
                                            <form action={async () => {
                                                "use server";
                                                await updateOrderStatus(order.id, 'verified');
                                            }}>
                                                <button className="bg-zinc-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-pink-600 transition-all shadow-sm">
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

                {/* Pagination */}
                <div className="p-4 md:p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-tighter">
                        Page {currentPage} of {totalPages || 1}
                    </p>
                    <div className="flex gap-2">
                        <Link
                            href={`?page=${Math.max(1, currentPage - 1)}${searchTerm ? `&search=${searchTerm}` : ''}`}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentPage <= 1 ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-white border border-gray-200 text-gray-700'}`}
                        >
                            Prev
                        </Link>
                        <Link
                            href={`?page=${Math.min(totalPages, currentPage + 1)}${searchTerm ? `&search=${searchTerm}` : ''}`}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentPage >= totalPages ? 'bg-gray-100 text-gray-400 pointer-events-none' : 'bg-zinc-900 text-white'}`}
                        >
                            Next
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}