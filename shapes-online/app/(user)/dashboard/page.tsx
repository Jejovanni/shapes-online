"use client";

import React from 'react';
import { ShoppingBag, DollarSign, RefreshCw, ArrowRight } from 'lucide-react';

// --- Mock Data ---

const USER_STATS = [
    { title: 'Total Orders', value: 12, icon: ShoppingBag, color: 'bg-pink-100 text-pink-600' },
    { title: 'Total Spent', value: '$845.50', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { title: 'Pending Returns', value: 1, icon: RefreshCw, color: 'bg-yellow-100 text-yellow-600' },
];

const RECENT_ORDERS = [
    { id: '1004', date: '2025-10-20', status: 'Delivered', total: 65.99 },
    { id: '1003', date: '2025-10-15', status: 'Processing', total: 112.50 },
    { id: '1002', date: '2025-10-01', status: 'Cancelled', total: 49.99 },
];

// Helper to determine status style
const getStatusBadge = (status: string) => {
    let colorClass = '';
    switch (status) {
        case 'Delivered':
            colorClass = 'bg-green-100 text-green-700';
            break;
        case 'Processing':
            colorClass = 'bg-yellow-100 text-yellow-700';
            break;
        case 'Cancelled':
            colorClass = 'bg-red-100 text-red-700';
            break;
        default:
            colorClass = 'bg-gray-100 text-gray-700';
            break;
    }
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
            {status}
        </span>
    );
};


// --- Component: Statistic Card ---

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between transition hover:shadow-xl">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6" />
        </div>
    </div>
);


// --- Main Dashboard Page ---

export default function DashboardPage() {
    const userName = 'Pixel Designer'; // Mock user name

    return (
        <div className="space-y-10">
            {/* Welcome Banner */}
            <div className="p-6 bg-pink-50 rounded-xl border border-pink-200">
                <h2 className="text-3xl font-bold text-pink-700">Welcome back, {userName}!</h2>
                <p className="mt-1 text-pink-600">Here's a quick overview of your account activity.</p>
            </div>

            {/* Statistics Section */}
            <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {USER_STATS.map((stat) => (
                        <StatCard key={stat.title} {...stat} value={stat.value} />
                    ))}
                </div>
            </section>

            {/* Recent Orders Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
                    <a
                        href="/dashboard/orders"
                        className="text-pink-600 hover:text-pink-700 font-medium flex items-center space-x-1"
                    >
                        <span>View All</span>
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {RECENT_ORDERS.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {getStatusBadge(order.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href={`/dashboard/orders/${order.id}`} className="text-pink-600 hover:text-pink-900 transition">
                                            Details
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}