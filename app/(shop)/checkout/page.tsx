"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types'; // Using your shared types
import { CheckCircle, Receipt, X, Camera, Loader2, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const router = useRouter();

    // --- HELPER: Currency Formatter ---
    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount).replace('NGN', '₦');
    };

    // 1. Safe Hydration for LocalStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsHydrated(true);
    }, []);

    // 2. Robust Calculation Logic (Prevents NaN)
    const subtotal = cartItems.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        return acc + (price * quantity);
    }, 0);

    // Only charge delivery if there are items
    const deliveryFee = cartItems.length > 0 ? 2500 : 0;
    const total = subtotal + deliveryFee;

    // 3. File Handling
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setScreenshot(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setScreenshot(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    // 4. Submit Logic
    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!screenshot) {
            alert("Please upload a screenshot of your transfer to complete your order.");
            return;
        }

        setIsProcessing(true);

        // Create a readable summary string for the DB
        const itemsSummary = cartItems
            .map(item => `${item.quantity || 1}x ${item.name}`)
            .join(', ');

        const formData = new FormData(e.currentTarget);
        formData.append('items_summary', itemsSummary);
        formData.append('total', total.toString()); // Send raw number string
        formData.append('screenshot', screenshot);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                localStorage.removeItem('cart');
                // Notify other components that cart is empty
                window.dispatchEvent(new Event('cartUpdated')); 
                router.push('/checkout/success');
            } else {
                const errorData = await response.json();
                alert(`Order failed: ${errorData.error || 'Server error'}`);
            }
        } catch (err) {
            console.error("Checkout Error:", err);
            alert("Network error. Please check your connection.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isHydrated) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <form onSubmit={handleCheckout} className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

                {/* LEFT COLUMN: Inputs */}
                <div className="space-y-8">
                    
                    {/* Shipping Details */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ShieldCheck className="text-pink-600" size={24} />
                            Shipping Details
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <input required name="firstName" placeholder="Full Name" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                            <input required name="email" type="email" placeholder="Email Address" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                            <input required name="phone" type="tel" placeholder="WhatsApp Number" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                            <textarea required name="address" placeholder="Full Delivery Address (Street, City, State)" rows={3} className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                        </div>
                    </section>

                    {/* Bank Transfer Details */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Bank Transfer</h2>
                            <div className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest">Secure</div>
                        </div>

                        <div className="p-6 bg-zinc-950 rounded-2xl text-white mb-8">
                            <h4 className="text-pink-400 font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                                <Receipt className="w-4 h-4" /> Official Business Account
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400 text-sm">Bank</span>
                                    <span className="font-bold">Wema Bank / ALAT</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400 text-sm">Account Name</span>
                                    <span className="font-bold uppercase">Shapes Online Ltd</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Account Number</span>
                                    <span className="text-pink-500 text-2xl font-mono font-bold tracking-tighter">0123456789</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700">Upload Transfer Proof</label>
                            {!previewUrl ? (
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-pink-300 group transition-all">
                                    <Camera className="w-10 h-10 text-gray-300 group-hover:text-pink-500 mb-2 transition-colors" />
                                    <p className="text-sm text-gray-500 font-medium">Click to upload transfer receipt</p>
                                    <p className="text-[10px] text-gray-400 mt-1">PNG, JPG or JPEG</p>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            ) : (
                                <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500 shadow-lg">
                                    <div className="relative h-64 w-full bg-gray-100">
                                        <Image src={previewUrl} alt="Receipt preview" fill className="object-contain" />
                                    </div>
                                    <button type="button" onClick={removeImage} className="absolute top-3 right-3 p-2 bg-black/70 text-white rounded-full hover:bg-red-500 transition-colors shadow-xl">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN: Summary */}
                <div className="lg:sticky lg:top-10 h-fit">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Final Summary</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal</span>
                                <span className="text-gray-900">{formatNaira(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Delivery Fee</span>
                                <span>{formatNaira(deliveryFee)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                <span className="font-bold text-gray-900">Total to Pay</span>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-gray-900 leading-none">
                                        {formatNaira(total)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing || !screenshot}
                            className={`w-full py-5 text-white font-black rounded-2xl text-xl transition-all flex items-center justify-center gap-3 shadow-lg ${
                                isProcessing || !screenshot
                                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                    : 'bg-pink-600 hover:bg-pink-700 active:scale-95 shadow-pink-100'
                            }`}
                        >
                            {isProcessing ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    <span>Submit Order</span>
                                </>
                            )}
                        </button>
                        
                        <p className="mt-6 text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
                            Orders are verified within 1-2 hours
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}