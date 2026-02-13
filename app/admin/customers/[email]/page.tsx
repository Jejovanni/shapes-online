import { createClient } from '@supabase/supabase-js';
import { ShoppingBag, TrendingUp, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CustomerDetailPage(props: { params: Promise<{ email: string }> }) {
    const params = await props.params;
    const email = decodeURIComponent(params.email);

    // Initialized inside to prevent build-time secret leaks
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: customer } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single();

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

    if (!customer) return <div className="p-10 text-center">Customer not found.</div>;

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Navigation */}
            <Link href="/admin/orders" className="flex items-center gap-2 text-gray-500 hover:text-pink-600 mb-6 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            {/* Header Section */}
            <header className="mb-8 md:mb-10">
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 break-all md:break-normal">
                    {customer.email}
                </h1>
                <p className="text-gray-500 text-sm md:text-base">Customer Profile & Purchase History</p>
            </header>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
                <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <TrendingUp className="text-pink-500 mb-3 md:mb-4" size={20} />
                    <p className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider">Lifetime Value</p>
                    <p className="text-2xl md:text-3xl font-black">₦{customer.total_spent.toLocaleString()}</p>
                </div>

                <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <ShoppingBag className="text-blue-500 mb-3 md:mb-4" size={20} />
                    <p className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider">Total Orders</p>
                    <p className="text-2xl md:text-3xl font-black">{customer.total_orders}</p>
                </div>

                <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <Calendar className="text-green-500 mb-3 md:mb-4" size={20} />
                    <p className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider">Last Order</p>
                    <p className="text-lg md:text-xl font-bold">
                        {new Date(customer.last_order_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* ORDER HISTORY */}
            <h2 className="text-lg md:text-xl font-bold mb-4">Order History</h2>

            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px] md:min-w-full">
                        <thead className="bg-gray-50 text-gray-500 text-[10px] md:text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4 md:p-5">Date</th>
                                <th className="p-4 md:p-5">Items</th>
                                <th className="p-4 md:p-5">Amount</th>
                                <th className="p-4 md:p-5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders?.map((order) => (
                                <tr key={order.id} className="text-xs md:text-sm hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 md:p-5 whitespace-nowrap">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 md:p-5 font-medium max-w-[200px] md:max-w-none truncate md:whitespace-normal">
                                        {order.items_summary}
                                    </td>
                                    <td className="p-4 md:p-5 font-mono font-bold">
                                        ₦{order.total_amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 md:p-5">
                                        <span className={`px-2 py-1 rounded-md text-[9px] md:text-[10px] font-black uppercase tracking-tighter md:tracking-normal ${order.status === 'verified'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}