"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '@/types'; // Assumes you created types/index.ts

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // --- HELPER: Currency Formatter ---
    const formatNaira = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount).replace('NGN', '₦');
    };

    // 1. Load & Clean Cart Data
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                // Data Cleanup: Ensure all items match the new structure
                // This handles the transition from 'img' to 'image' and 'string price' to 'number'
                const cleanCart = parsed.map((item: any) => ({
                    ...item,
                    // If 'image' is missing, try 'img', otherwise fallback
                    image: item.image || item.img || '/images/placeholder.jpg', 
                    // Ensure price is a clean number
                    price: typeof item.price === 'string' 
                        ? parseFloat(item.price.replace(/[^\d.]/g, '')) 
                        : item.price
                }));
                setCartItems(cleanCart);
            } catch (error) {
                console.error("Failed to parse cart:", error);
                // If data is corrupt, clear it
                localStorage.removeItem('cart');
            }
        }
        setIsHydrated(true);
    }, []);

    // 2. Quantity Change logic
    const updateQuantity = (index: number, delta: number) => {
        const updatedCart = [...cartItems];
        const currentQty = Number(updatedCart[index].quantity) || 1;
        const newQty = currentQty + delta;

        if (newQty >= 1) {
            updatedCart[index] = { ...updatedCart[index], quantity: newQty };
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
        }
    };

    // 3. Remove item logic
    const removeItem = (indexToRemove: number) => {
        const newCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // 4. Calculation Logic (Strictly Numeric)
    const subtotal = cartItems.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.quantity) || 1;
        return acc + (price * qty);
    }, 0);

    const deliveryFee = cartItems.length > 0 ? 2500 : 0;
    const total = subtotal + deliveryFee;

    if (!isHydrated) return null;

    return (
        <div className="min-h-screen font-sans pt-24 pb-12 bg-gray-950 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4 mb-10">
                    <ShoppingBag className="h-10 w-10 text-pink-500" />
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Your <span className="text-pink-500">Cart</span>
                    </h1>
                </div>

                {cartItems.length === 0 ? (
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* LEFT COLUMN: Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:border-pink-500/30 transition-colors"
                                >
                                    <div className="w-24 h-24 flex-shrink-0 relative bg-gray-800 rounded-xl overflow-hidden">
                                        {/* Added Safety Check for Image Src */}
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-1">{item.description}</p>
                                    </div>

                                    {/* QUANTITY TOGGLE */}
                                    <div className="flex items-center space-x-4 bg-gray-800/50 p-2 rounded-xl border border-gray-700">
                                        <button
                                            onClick={() => updateQuantity(index, -1)}
                                            className="p-1 text-gray-400 hover:text-pink-500 transition-colors disabled:opacity-30"
                                            disabled={(item.quantity || 1) <= 1}
                                        >
                                            <Minus className="h-5 w-5" />
                                        </button>
                                        <span className="text-white font-bold w-6 text-center">
                                            {item.quantity || 1}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(index, 1)}
                                            className="p-1 text-gray-400 hover:text-pink-500 transition-colors"
                                        >
                                            <Plus className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="text-center sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto space-x-4 sm:space-x-0">
                                        <span className="text-xl font-black text-pink-500">
                                            {formatNaira((Number(item.price) || 0) * (item.quantity || 1))}
                                        </span>
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

                        {/* RIGHT COLUMN: Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 sticky top-28 shadow-2xl">
                                <h2 className="text-2xl text-white font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>{formatNaira(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Delivery Fee</span>
                                        <span>{formatNaira(deliveryFee)}</span>
                                    </div>
                                    <div className="h-px bg-gray-800 my-4" />
                                    <div className="flex justify-between text-xl font-bold text-white">
                                        <span>Total</span>
                                        <span className="text-pink-500">{formatNaira(total)}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full inline-block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 px-10 rounded-xl shadow-lg shadow-emerald-900/20 transition-all transform active:scale-95 mb-4"
                                >
                                    Proceed to Checkout
                                </Link>

                                <p className="text-center text-xs text-gray-500 uppercase tracking-widest font-semibold pt-8">
                                    Secure Transfer via Bank App
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