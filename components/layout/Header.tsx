"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const marketingLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // Added state for cart count

    // Function to calculate count from localStorage
    const updateCartCount = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            // Sum up all quantities
            const totalItems = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
            setCartCount(totalItems);
        } catch (error) {
            setCartCount(0);
        }
    };

    // Listen for cart updates
    useEffect(() => {
        updateCartCount(); // Initial check

        // Listen for the custom event dispatched from the Shop Section
        window.addEventListener('cartUpdated', updateCartCount);
        
        // Also listen to storage events (in case of multiple tabs)
        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsDrawerOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? 'hidden' : 'unset';
    }, [isDrawerOpen]);

    return (
        <header className="sticky top-0 z-50 bg-black text-pink-400 shadow-lg shadow-pink-900/50">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                
                <Link href="/" className="inline-flex items-center hover:opacity-80 transition duration-300">
                    <Image
                        src="/Shapes_logo.png"
                        alt="Shapes Online Logo"
                        width={200}
                        height={50}
                        priority
                        className="w-[120px] md:w-[180px] h-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {marketingLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-medium hover:text-pink-100 transition duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions & CTA */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <Link href="/#shop" className="hidden sm:block px-4 py-1.5 bg-pink-600 text-black font-semibold rounded-full hover:bg-pink-400 transition duration-300 text-base">
                        Shop Now
                    </Link>

                    {/* Shopping Cart with Badge */}
                    <Link href="/cart" aria-label="Shopping Cart" className="relative p-2 hover:bg-pink-900 rounded-full transition duration-300">
                        <ShoppingCart className="h-7 w-7" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black animate-in fade-in zoom-in duration-300">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="md:hidden p-2 hover:bg-pink-900 rounded-full transition duration-300" 
                        aria-label="Open menu"
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                </div>
            </div>

            {/* --- MOBILE DRAWER --- */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                    isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                style={{ zIndex: 100 }}
                onClick={() => setIsDrawerOpen(false)}
            />

            <aside
                className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-zinc-950 border-l border-pink-900/30 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
                    isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ zIndex: 101 }}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between mb-12">
                        <span className="text-xl font-black tracking-widest text-pink-500">MENU</span>
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="p-2 rounded-full bg-pink-900/20 text-pink-400 hover:bg-pink-900/40 transition-all"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-6">
                        {marketingLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-3xl font-bold text-white hover:text-pink-400 transition-colors"
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto border-t border-pink-900/20 pt-8">
                        <Link 
                            href="/#shop" 
                            className="flex justify-center w-full py-4 bg-pink-600 text-black font-black rounded-xl text-xl uppercase tracking-tighter"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            Shop Now
                        </Link>
                        <p className="mt-6 text-center text-sm text-pink-900">
                            © 2026 Shapes Lagos.
                        </p>
                    </div>
                </div>
            </aside>
        </header>
    );
};