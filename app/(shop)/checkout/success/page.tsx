"use client";
import { useEffect } from 'react';
import { CheckCircle, Truck, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
    useEffect(() => {
        // Clear the cart so the header badge goes back to 0
        localStorage.removeItem('cart');
        localStorage.removeItem('guestInfo');

        // Notify the header to update its count
        window.dispatchEvent(new Event('cartUpdated'));
    }, []);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="bg-pink-100 p-4 rounded-full">
                        <CheckCircle className="h-12 w-12 text-pink-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-gray-900">Order Received!</h1>
                <p className="text-gray-500">
                    Your order **#SHP-2026** has been placed.
                    A confirmation has been sent to your email.
                </p>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-4">
                    <div className="flex gap-4">
                        <Truck className="h-5 w-5 text-pink-600" />
                        <div>
                            <p className="font-bold text-sm">Estimated Delivery</p>
                            <p className="text-xs text-gray-500">24 - 48 Hours (Lagos)</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <MessageCircle className="h-5 w-5 text-pink-600" />
                        <div>
                            <p className="font-bold text-sm">Need Help?</p>
                            <p className="text-xs text-gray-500">Chat with us on WhatsApp for instant support.</p>
                        </div>
                    </div>
                </div>

                <Link href="/" className="block w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-all">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}