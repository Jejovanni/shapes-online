import { createClient } from '@supabase/supabase-js';
import { ShoppingBag, TrendingUp, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CustomerDetailPage(props: { params: Promise<{ email: string }> }) {
    
    // 2. Await the params before using them
    const params = await props.params;
    const email = decodeURIComponent(params.email);
    
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Fetch the Customer Summary (LTV)
    const { data: customer } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single();

    // 2. Fetch all Orders for this email
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

    if (!customer) return <div className="p-10 text-center">Customer not found.</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Link href="/admin/orders" className="flex items-center gap-2 text-gray-500 hover:text-pink-600 mb-6 transition-colors">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <header className="mb-10">
                <h1 className="text-4xl font-black text-gray-900">{customer.email}</h1>
                <p className="text-gray-500">Customer Profile & Purchase History</p>
            </header>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <TrendingUp className="text-pink-500 mb-4" />
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Lifetime Value</p>
                    <p className="text-3xl font-black">₦{customer.total_spent.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <ShoppingBag className="text-blue-500 mb-4" />
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Total Orders</p>
                    <p className="text-3xl font-black">{customer.total_orders}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <Calendar className="text-green-500 mb-4" />
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Last Order</p>
                    <p className="text-xl font-bold">
                        {new Date(customer.last_order_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* ORDER HISTORY TABLE */}
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                        <tr>
                            <th className="p-5">Date</th>
                            <th className="p-5">Items</th>
                            <th className="p-5">Amount</th>
                            <th className="p-5">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders?.map((order) => (
                            <tr key={order.id} className="text-sm">
                                <td className="p-5">{new Date(order.created_at).toLocaleDateString()}</td>
                                <td className="p-5 font-medium">{order.items_summary}</td>
                                <td className="p-5 font-mono">₦{order.total_amount.toLocaleString()}</td>
                                <td className="p-5">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                                        order.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}