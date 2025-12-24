"use client";

import React from 'react';
import { ShoppingCart, User, Search, Home } from 'lucide-react';

// --- ShopHeader Component (Integrated) ---

const ShopHeader = () => {
    return (
        <header className="sticky top-0 z-50 bg-white text-gray-900 border-b border-pink-200 shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo/Back to Marketing Home */}
                <a href="/" className="flex items-center space-x-2 text-xl font-extrabold tracking-wider text-pink-600 hover:text-pink-800 transition duration-300">
                    <Home className="h-5 w-5" />
                    <span>SHAPES SHOP</span>
                </a>

                {/* Search Bar (Main Shop Focus) */}
                <div className="hidden md:flex flex-grow max-w-lg mx-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-pink-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-150"
                    />
                    <button className="px-4 bg-pink-600 text-white rounded-r-full hover:bg-pink-700 transition duration-300">
                        <Search className="h-5 w-5" />
                    </button>
                </div>

                {/* Actions & User */}
                <div className="flex items-center space-x-4">
                    <a href="/dashboard" aria-label="User Account" className="p-2 hover:bg-pink-100 rounded-full transition duration-300">
                        <User className="h-6 w-6" />
                    </a>

                    <a href="/cart" aria-label="Shopping Cart" className="p-2 relative hover:bg-pink-100 rounded-full transition duration-300">
                        <ShoppingCart className="h-6 w-6" />
                        {/* Placeholder for Cart Item Count */}
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-pink-600 rounded-full">3</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

// --- ShopFooter Component (Integrated) ---

const ShopFooter = () => {
    // A simple, lighter footer focused on quick links and legal info
    return (
        <footer className="bg-gray-50 text-gray-600 border-t border-gray-200 mt-12">
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center">

                <div className="flex justify-center space-x-6 mb-4 text-sm">
                    <a href="/shipping" className="hover:text-pink-600 transition duration-300">Shipping Info</a>
                    <span className="text-gray-300">|</span>
                    <a href="/returns" className="hover:text-pink-600 transition duration-300">Returns Policy</a>
                    <span className="text-gray-300">|</span>
                    <a href="/terms" className="hover:text-pink-600 transition duration-300">Terms of Service</a>
                </div>

                <p className="text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Shapes Online Shop. All prices are in USD.
                </p>
            </div>
        </footer>
    );
};


/**
 * Default Export: Shop Layout
 * Wraps all pages under the (shop) route group (/products, /cart, etc.).
 */
export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

            {/* 1. Shop Header */}
            <ShopHeader />

            {/* 2. Main Content Area */}
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* 3. Shop Footer */}
            <ShopFooter />
        </div>
    );
}