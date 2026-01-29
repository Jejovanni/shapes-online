"use client"
// Using standard anchor tags (<a>) instead of next/link to resolve environment-specific compilation errors
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

// Define the navigation links for the marketing area
const marketingLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];


export const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer on window resize if switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDrawerOpen]);

    return (
        <header className="sticky top-0 z-50 bg-black text-pink-400 shadow-lg shadow-pink-900/50">
            <div className="container mx-auto flex h-25 items-center justify-between px-4 sm:px-6 lg:px-8">
               
                <Link href="/" className="inline-flex items-center hover:opacity-80 transition duration-300">
                    <Image
                        src="/Shapes_logo.png"  // Path relative to /public (replace with your actual filename)
                        alt="Shapes Online Logo"
                        width={200}      // Adjust to your logo's desired display width (in pixels)
                        height={50}      // Adjust to maintain aspect ratio (use your logo's natural ratio)
                        priority         // Optional: Loads faster since it's above-the-fold (navbar logo)
                        className="w-[150px] md:w-[200px] h-auto"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                            const fallback = img.nextSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                        }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {marketingLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-xl font-medium hover:text-pink-100 transition duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions & CTA */}
                <div className="flex items-center space-x-4">
                    <Link href="/products" className="hidden sm:block px-4 py-1.5 bg-pink-600 text-black font-semibold rounded-full hover:bg-pink-400 transition duration-300 text-lg">
                        Shop Now
                    </Link>

                    <Link href="/cart" aria-label="Shopping Cart" className="p-2 hover:bg-pink-900 rounded-full transition duration-300">
                        <ShoppingCart className="h-8 w-8" />
                    </Link>

                    <Link href="/login" aria-label="User Account" className="p-2 hover:bg-pink-900 rounded-full transition duration-300">
                        <User className="h-8 w-8" />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="md:hidden p-2 hover:bg-pink-900 rounded-full transition duration-300" 
                        aria-label="Open menu"
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                </div>
            </div>

                    {/* --- MOBILE DRAWER COMPONENT --- */}
      
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ zIndex: 100 }}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
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
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            {marketingLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-3xl font-bold text-white hover:text-pink-400 transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-pink-900/20 pt-8">
            <a 
              href="/products" 
              className="flex justify-center w-full py-4 bg-pink-600 text-black font-black rounded-xl text-xl uppercase tracking-tighter"
              onClick={() => setIsDrawerOpen(false)}
            >
              Shop Now
            </a>
            <p className="mt-6 text-center text-sm text-pink-900">
              © 2024 Shapes Lagos. All rights reserved.
            </p>
          </div>
        </div>
      </aside>

        </header>
    );
};