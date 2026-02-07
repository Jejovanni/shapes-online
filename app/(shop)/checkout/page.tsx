"use client";

import React, { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, Lock, CheckCircle } from 'lucide-react';

// --- Mock Data (Synced with Cart) ---
const ORDER_SUMMARY = {
    subtotal: 94.97,
    shipping: 5.00,
    tax: 7.60,
    total: 107.57,
    items: [
        { id: 1, title: 'Neo-Prism Vector Set', price: 29.99, quantity: 1, image: 'https://placehold.co/80x80/F472B6/111?text=Prism' },
        { id: 2, title: 'Cyber Grids Vol. 1', price: 39.99, quantity: 2, image: 'https://placehold.co/80x80/7C3AED/111?text=Grids' },
    ]
};

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            alert('Order placed successfully! (This is a demo)');
            // Redirect to success page would happen here
        }, 2000);
    };

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
                        <Lock className="h-8 w-8 text-pink-600" />
                        <span>Secure Checkout</span>
                    </h1>
                    <p className="text-gray-500 mt-2">Complete your purchase safely and securely.</p>
                </header>

                <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                    {/* LEFT COLUMN: Forms (Shipping & Payment) */}
                    <div className="lg:col-span-7 space-y-8">

                        <form id="checkout-form" onSubmit={handlePlaceOrder}>

                            {/* 1. Contact & Shipping Info */}
                            <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                    <Truck className="h-5 w-5 text-pink-600" />
                                    <span>Shipping Information</span>
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                    </div>

                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                    </div>

                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                    </div>
                                </div>
                            </section>

                            {/* 2. Payment Details */}
                            <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                    <CreditCard className="h-5 w-5 text-pink-600" />
                                    <span>Payment Method</span>
                                </h2>

                                {/* Payment Tabs */}
                                <div className="flex gap-4 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${paymentMethod === 'card'
                                                ? 'border-pink-600 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 text-gray-600 hover:border-pink-300'
                                            }`}
                                    >
                                        Credit Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${paymentMethod === 'paypal'
                                                ? 'border-pink-600 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 text-gray-600 hover:border-pink-300'
                                            }`}
                                    >
                                        PayPal
                                    </button>
                                </div>

                                {paymentMethod === 'card' ? (
                                    <div className="space-y-4 animate-fadeIn">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration (MM/YY)</label>
                                                <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                                <input type="text" placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                        <p className="text-gray-600">You will be redirected to PayPal to complete your purchase securely.</p>
                                    </div>
                                )}
                            </section>

                        </form>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-5 mt-10 lg:mt-0">
                        <div className="sticky top-6">
                            <div className="bg-gray-50 p-6 rounded-2xl shadow-xl border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                                {/* Items List */}
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {ORDER_SUMMARY.items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover object-center"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = "https://placehold.co/80x80/D1D5DB/4B5563?text=Img";
                                                    }}                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>{item.title}</h3>
                                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-4 space-y-3 text-gray-700 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${ORDER_SUMMARY.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>${ORDER_SUMMARY.shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Taxes</span>
                                        <span>${ORDER_SUMMARY.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                                        <span>Total</span>
                                        <span className="text-pink-600">${ORDER_SUMMARY.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isProcessing}
                                    className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition transform hover:scale-[1.01] duration-300"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">Processing...</span>
                                    ) : (
                                        <>
                                            <CheckCircle className="h-5 w-5" />
                                            <span>Place Order</span>
                                        </>
                                    )}
                                </button>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Encrypted and Secure Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}