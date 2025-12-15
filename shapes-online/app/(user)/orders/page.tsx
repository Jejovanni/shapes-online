"use client";

import React from 'react';
import { Receipt, Search, ArrowRight } from 'lucide-react';

// --- Mock Data ---

const MOCK_ORDERS = [
    { id: '1005', date: '2025-11-01', status: 'Delivered', total: 107.57, items: 3 },
    { id: '1004', date: '2025-10-20', status: 'Delivered', total: 65.99, items: 2 },
    { id: '1003', date: '2025-10-15', status: 'Processing', total: 112.50, items: 4 },
    { id: '1002', date: '2025-10-01', status: 'Cancelled', total: 49.99, items: 1 },
    { id: '1001', date: '2025-09-25', status: 'Delivered', total: 205.15, items: 5 },
];

// Helper to determine status style
const getStatusBadge = (status: string) => {
    let colorClass = '';
    switch (status) {
        case 'Delivered':
            colorClass = 'bg-green-100 text-green-700 ring-green-500/10';
            break;
        case 'Processing':
            colorClass = 'bg-yellow-100 text-yellow-700 ring-yellow-500/10';
            break;
        case 'Cancelled':
            colorClass = 'bg-red-100 text-red-700 ring-red-500/10';
            break;
        default:
            colorClass = 'bg-gray-100 text-gray-700 ring-gray-500/10';
            break;
    }
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
            {status}
        </span>
    );
};

// --- Main Order History Page ---

export default function OrderHistoryPage() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center space-x-3 border-b pb-4">
                <Receipt className="h-7 w-7 text-pink-600" />
                <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
            </div>

            {/* Search and Filters (Mock) */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search by Order ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-pink-500 focus:border-pink-500 transition"
                    />
                </div>
                <div className="w-full md:w-auto">
                    <select className="w-full md:w-48 py-2 px-3 border border-gray-300 rounded-xl focus:ring-pink-500 focus:border-pink-500 bg-white">
                        <option>Filter by Status</option>
                        <option>Delivered</option>
                        <option>Processing</option>
                        <option>Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {MOCK_ORDERS.map((order) => (
                            <tr key={order.id} className="hover:bg-pink-50/50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.items}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {getStatusBadge(order.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-gray-900">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                        href={`/dashboard/orders/${order.id}`}
                                        className="text-pink-600 hover:text-pink-800 transition flex items-center justify-end gap-1"
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Mock) */}
            <div className="flex justify-center pt-4">
                <div className="flex space-x-1">
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-lg transition">Previous</button>
                    <span className="px-3 py-1 font-semibold bg-pink-600 text-white rounded-lg">1</span>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-lg transition">2</button>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-lg transition">3</button>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-lg transition">Next</button>
                </div>
            </div>
        </div>
    );
}