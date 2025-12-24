"use client";

import React, { useState } from 'react';
import { LayoutDashboard, Receipt, User, LogOut, Menu, X } from 'lucide-react';

// Mock Navigation Items
const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Order History', href: '/dashboard/orders', icon: Receipt },
    { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
];

// Helper component for Navigation Link
const NavLink = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    return (
        <a
            href={item.href}
            onClick={onClick}
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
        >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
        </a>
    );
};


export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Mock function for getting active path
    // NOTE: In a real Next.js app, you would use usePathname() here.
    const getIsActive = (href: string) => {
        if (typeof window === 'undefined') return false;
        // Simple check: e.g., /dashboard/orders is active for /dashboard/orders
        return window.location.pathname.startsWith(href);
    };

    const handleLogout = () => {
        // Implement Firebase/Auth log out logic here
        console.log("User logged out (Placeholder)");
        // window.location.href = '/login'; // Redirect after logout
        alert("Logged out successfully! (Placeholder)");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header and Mobile Menu */}
                <header className="mb-8 flex justify-between items-center lg:block">
                    <h1 className="text-3xl font-extrabold text-gray-900">Your Account</h1>
                    <button
                        className="p-2 lg:hidden text-gray-600 hover:text-pink-600 rounded-full bg-white shadow"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </header>

                <div className="lg:grid lg:grid-cols-12 lg:gap-10">

                    {/* Sidebar Navigation (Col-span 3) */}
                    <aside className="lg:col-span-3">
                        {/* Mobile Sidebar */}
                        <div
                            className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
                            onClick={() => setIsSidebarOpen(false)}
                        ></div>
                        <nav
                            className={`fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-xl z-30 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:p-0 lg:h-auto lg:w-full lg:rounded-xl lg:border lg:border-gray-200 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                                }`}
                        >
                            <div className="lg:hidden flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-pink-600">Menu</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-pink-600">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {navItems.map(item => (
                                    <NavLink
                                        key={item.name}
                                        item={item}
                                        isActive={getIsActive(item.href)}
                                        onClick={() => setIsSidebarOpen(false)}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-100">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 p-3 w-full rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content Area (Col-span 9) */}
                    <main className="lg:col-span-9 mt-6 lg:mt-0">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 min-h-[70vh]">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}