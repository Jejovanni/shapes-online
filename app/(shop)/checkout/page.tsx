"use client";
import React, { useState, useEffect } from 'react'; // Added useEffect
import { useRouter } from 'next/navigation';
import { CheckCircle, Smartphone, CreditCard, Receipt, X, Camera } from 'lucide-react';

export default function CheckoutPage() {
    // --- 1. NEW STATE FOR CART DATA ---
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // --- 2. LOAD DATA FROM LOCALSTORAGE ---
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        setIsHydrated(true);
    }, []);

    // --- 3. CALCULATE REAL TOTALS ---
    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
        return acc + (price * (item.quantity || 1));
    }, 0);
    const deliveryFee = cartItems.length > 0 ? 2500 : 0;
    const total = subtotal + deliveryFee;

    const [paymentMethod, setPaymentMethod] = useState<'gateway' | 'app'>('gateway');
    const [isProcessing, setIsProcessing] = useState(false);
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const router = useRouter();

    // 1. Handle File Selection and Preview
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setScreenshot(file);
        // Create a temporary URL for the preview image
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    }
};

// 2. Handle Image Removal
const removeImage = () => {
    setScreenshot(null);
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Clean up memory
        setPreviewUrl(null);
    }
};

   const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // 1. Manual Validation for Screenshots
        if (paymentMethod === 'app' && !screenshot) {
            alert("Please upload a screenshot of your transfer to continue.");
            setIsProcessing(false);
            return;
        }

        // 2. Prepare Cart Summary for Supabase
        const itemsSummary = cartItems
            .map(item => `${item.quantity || 1}x ${item.name}`)
            .join(', ');

        // 3. Gather Form Data
        // We use e.currentTarget to grab the <form> the button belongs to
        const formElement = e.currentTarget.closest('form') || e.currentTarget as HTMLFormElement;
        const formData = new FormData(formElement);

        // 4. Inject the "Calculated" data into the form object
        formData.append('items_summary', itemsSummary);
        formData.append('total', total.toString());
        formData.append('paymentMethod', paymentMethod);

        // Append the file (handled separately from standard text inputs)
        if (screenshot) {
            formData.append('screenshot', screenshot);
        }

        try {
            // 5. Send to Netlify API Route
            const response = await fetch('/api/checkout', {
                method: 'POST',
                body: formData, // Browser automatically sets 'multipart/form-data'
            });

            if (response.ok) {
                // Success! Clear the user's cart
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('cartUpdated')); // Update your Navbar icon if you have one
                router.push('/checkout/success');
            } else {
                const errorData = await response.json();
                alert(`Order failed: ${errorData.error || 'Please check your connection.'}`);
            }
        } catch (err) {
            console.error("Critical Checkout Error:", err);
            alert("A network error occurred. Please check your internet and try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Prevent hydration mismatch (standard Next.js practice)
    if (!isHydrated) return null;

   return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
        {/* 1. WRAP EVERYTHING IN A FORM */}
        <form onSubmit={handleCheckout} className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

            <div className="space-y-8">
                {/* 2. SHIPPING & CONTACT SECTION */}
                <section className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                    <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input 
                            required
                            name="full_name" 
                            type="text" 
                            placeholder="Full Name" 
                            className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        />
                        <input 
                            required
                            name="email" 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        />
                        <input 
                            required
                            name="phone" 
                            type="tel" 
                            placeholder="Phone Number (WhatsApp preferred)" 
                            className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        />
                        <textarea 
                            required
                            name="address" 
                            placeholder="Full Delivery Address" 
                            rows={3}
                            className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        />
                    </div>
                </section>

                <section className="bg-white p-6 rounded-3xl shadow-sm border">
                    <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                    <div className="grid grid-cols-1 gap-4 mb-6">
                        {/* Type="button" prevents these from submitting the form early */}
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('gateway')}
                            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'gateway' ? 'border-pink-500 bg-pink-50' : 'border-gray-100'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm"><CreditCard className="text-pink-600" /></div>
                                <div className="text-left">
                                    <p className="font-bold text-gray-900">Card / Local Bank</p>
                                    <p className="text-xs text-gray-500">Paystack Instant Pay</p>
                                </div>
                            </div>
                            {paymentMethod === 'gateway' && <CheckCircle className="text-pink-500 w-5 h-5 shadow-sm" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod('app')}
                            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'app' ? 'border-pink-500 bg-pink-50' : 'border-gray-100'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm"><Smartphone className="text-pink-600" /></div>
                                <div className="text-left text-gray-900">
                                    <p className="font-bold">LemFi / TapTap / Sendwave</p>
                                    <p className="text-xs text-gray-500">Manual Transfer</p>
                                </div>
                            </div>
                            {paymentMethod === 'app' && <CheckCircle className="text-pink-500 w-5 h-5 shadow-sm" />}
                        </button>
                    </div>

                    {/* Remittance Instructions & Upload Area */}
                    {paymentMethod === 'app' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="p-6 bg-zinc-950 rounded-2xl text-white">
                                <h4 className="text-pink-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                                    <Receipt className="w-4 h-4" /> Bank Account Details
                                </h4>
                                <div className="space-y-3 font-medium">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-gray-500">Bank</span>
                                        <span>Wema Bank / ALAT</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-gray-500">Name</span>
                                        <span>SHAPES ONLINE LTD</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Number</span>
                                        <span className="text-pink-500 text-xl font-mono tracking-tighter">0123456789</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700">Upload Transfer Screenshot</label>
                                {!previewUrl ? (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-pink-400 transition-all group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Camera className="w-8 h-8 text-gray-400 group-hover:text-pink-500 mb-3 transition-colors" />
                                            <p className="text-sm text-gray-500 font-medium">Click to upload or drag & drop</p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                ) : (
                                    <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500 shadow-xl group">
                                        <img src={previewUrl} alt="Receipt preview" className="w-full h-48 object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-red-500 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-pink-500 text-white text-[10px] font-bold py-1 text-center uppercase">
                                            Screenshot Attached
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="sticky top-10 h-fit">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Final Summary</h3>
                    <div className="text-5xl font-black text-gray-900 mb-2">
                        ₦{total.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-400 mb-8">Includes ₦2,500 delivery fee</p>
                    
                    {/* Changed to type="submit" so it triggers the form onSubmit */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-5 text-white font-black rounded-2xl text-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                            paymentMethod === 'app' && !screenshot 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-pink-600 hover:bg-pink-700'
                        }`}
                    >
                        {isProcessing ? "Processing..." : (
                            <>
                                <CheckCircle className="w-6 h-6" />
                                <span>Complete Order</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    </div>
);
}