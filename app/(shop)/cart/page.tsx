"use client";

import React, { useState, useMemo } from 'react';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';

// --- Mock Data ---
const MOCK_CART_ITEMS = [
    { id: 'neo-prism', title: 'Neo-Prism Vector Set', price: 29.99, quantity: 1, image: 'https://placehold.co/100x100/F472B6/111?text=Prism' },
    { id: 'cyber-grids', title: 'Cyber Grids Vol. 1', price: 39.99, quantity: 2, image: 'https://placehold.co/100x100/7C3AED/111?text=Grids' },
    { id: 'liquid-blobs', title: 'Liquid Blobs Collection', price: 24.99, quantity: 1, image: 'https://placehold.co/100x100/FFD43B/111?text=Blobs' },
];

const SHIPPING_FEE = 5.00;
const TAX_RATE = 0.08; // 8%

// --- CartItem Component ---

interface CartItemProps {
    item: typeof MOCK_CART_ITEMS[0];
    onUpdateQuantity: (id: string, newQuantity: number) => void;
    onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex items-center justify-between py-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 flex-grow">
                {/* Product Image */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/D1D5DB/4B5563?text=Img"; }}
                />

                {/* Product Info */}
                <div className="flex flex-col">
                    <a href={`/products/${item.id}`} className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition">
                        {item.title}
                    </a>
                    <p className="text-pink-600 font-bold text-xl mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
                </div>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-gray-100 transition text-gray-700 disabled:opacity-50"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 text-base font-medium text-gray-900">{item.quantity}</span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition text-gray-700"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>

                {/* Remove Button */}
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                    aria-label={`Remove ${item.title}`}
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};


// --- Main Cart Page Component ---

export default function CartPage() {
    const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS);

    // Calculate totals using useMemo for performance
    const { subtotal, taxAmount, total } = useMemo(() => {
        const currentSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const currentTaxAmount = currentSubtotal * TAX_RATE;
        const currentTotal = currentSubtotal + SHIPPING_FEE + currentTaxAmount;

        return {
            subtotal: currentSubtotal,
            taxAmount: currentTaxAmount,
            total: currentTotal,
        };
    }, [cartItems]);

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return; // Prevent quantity below 1
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemoveItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-pink-600 flex items-center justify-center space-x-3">
                        <ShoppingCart className="h-10 w-10" />
                        <span>Your Shopping Cart</span>
                    </h1>
                    <p className="text-lg text-gray-500 mt-2">Ready to checkout? We thought so!</p>
                </header>

                {isCartEmpty ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty.</h2>
                        <p className="text-gray-500 mt-2">Add some stunning shapes to start your next design project.</p>
                        <a href="/products" className="mt-6 inline-block px-6 py-2 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition">
                            Start Shopping
                        </a>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                        {/* Cart Items List (2/3 width) */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 divide-y divide-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2">Items ({cartItems.length})</h2>
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </div>

                        {/* Order Summary (1/3 width) */}
                        <div className="lg:col-span-1 mt-10 lg:mt-0 lg:sticky lg:top-10 h-fit">
                            <div className="bg-gray-50 p-6 rounded-2xl shadow-xl border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Order Summary</h2>

                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Shipping:</span>
                                        <span className="font-medium">${SHIPPING_FEE.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Estimated Tax ({TAX_RATE * 100}%):</span>
                                        <span className="font-medium">${taxAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t-2 border-pink-200 flex justify-between items-center text-xl font-bold text-gray-900">
                                    <span>Order Total:</span>
                                    <span className="text-pink-600">${total.toFixed(2)}</span>
                                </div>

                                <a
                                    href="/checkout"
                                    className="mt-6 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-[1.01] duration-300"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="h-5 w-5" />
                                </a>

                                <div className="text-center text-sm text-gray-400 mt-4">
                                    Taxes and shipping calculated at checkout.
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}