"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Define the Product interface to match your Shop section
interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    img: string;
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // 1. Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart:", error);
            }
        }
        setIsHydrated(true);
    }, []);

    // 2. Remove item logic
    const removeItem = (indexToRemove: number) => {
        const newCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        // Trigger event for Header/Navbar count
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // 3. Calculation Logic
    const subtotal = cartItems.reduce((acc, item) => {
        // Strips ₦ and commas to calculate
        const price = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
        return acc + price;
    }, 0);

    const deliveryFee = cartItems.length > 0 ? 2500 : 0;
    const total = subtotal + deliveryFee;

    // Prevent hydration mismatch (don't render cart until client-side)
    if (!isHydrated) return null;
    // bg - gray - 950
    return (
        <div className="min-h-screen font-sans pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4 mb-10">
                    <ShoppingBag className="h-10 w-10 text-pink-500" />
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Your <span className="text-pink-500">Cart</span>
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    /* EMPTY STATE */
                    <div className="bg-gray-900 rounded-3xl p-12 text-center border border-gray-800 shadow-2xl">
                        <div className="bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="h-10 w-10 text-gray-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your cart is feeling light</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Looks like you haven&apos;t added any transformation kits to your journey yet.
                        </p>
                        <Link
                            href="/#shop"
                            className="inline-flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
                        >
                            <span>Start Shopping</span>
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                ) : (
                    /* CART CONTENT */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:border-pink-500/30 transition-colors"
                                >
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-1">{item.description}</p>
                                    </div>
                                    <div className="text-center sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto space-x-4 sm:space-x-0">
                                        <span className="text-xl font-black text-pink-500">{item.price}</span>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 sticky top-28 shadow-2xl">
                                <h2 className="text-2xl text-white font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₦{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Delivery Fee</span>
                                        <span>₦{deliveryFee.toLocaleString()}</span>
                                    </div>
                                    <div className="h-px bg-gray-800 my-4" />
                                    <div className="flex justify-between text-xl font-bold text-white">
                                        <span>Total</span>
                                        <span className="text-pink-500">₦{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link 
                                href="/checkout" 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 px-10 rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform active:scale-95 mb-4">
                                    Proceed to Checkout
                                </Link>

                                <p className="text-center text-xs text-gray-500 uppercase tracking-widest font-semibold pt-8">
                                    Secure Checkout Powered by Paystack
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;