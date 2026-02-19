"use client";

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

// Imported UI Components
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import Button from '@/components/Button';
import IconPlaceholder from '@/components/IconPlaceholder';

export default function HeroSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  // Initialize Cart Count
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const currentCart: CartItem[] = JSON.parse(savedCart);
        setCartCount(currentCart.length);
      } catch (e) {
        console.error("Error parsing cart:", e);
      }
    }
  }, []);

  const products: Product[] = [
    { id: "1", name: "Shapes Lagos Premium kit", price: 415000, description: "The 90 days total weightloss wellness plan, the top of our product line.", image: "/images/IMG-20251029-WA0002.jpg" },
    { id: "2", name: "Shapes Lagos Signature Kit", price: 140000, description: "Contains the new and improved Bum & slim tea. All natural ingredients.", image: "/images/IMG-20251030-WA0003.jpg" },
    { id: "3", name: "VVIP Kit with Coffee & Protein Shake", price: 116000, description: "Contains a comprehensive weight loss regimen including the skinny coffee and protein shake for healthy nutrition.", image: "/images/IMG-20251030-WA0001.jpg" },
    { id: "4", name: "VVIP Kit with Coffee", price: 95000, description: "High-quality plant-based products to blast tummy fat.", image: "/images/IMG-20251030-WA0002.jpg" },
  ];

  // Add to Cart Logic
  const addToCart = (product: Product) => {
    try {
      const savedCart = localStorage.getItem('cart');
      const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
      const existingItemIndex = currentCart.findIndex((item) => item.id === product.id);

      let newCart: CartItem[];
      if (existingItemIndex > -1) {
        newCart = [...currentCart];
        newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
      } else {
        newCart = [...currentCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      setCartCount(newCart.length);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  return (
    <main className="bg-gray-900 text-white font-sans min-h-screen">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/Shapes_Banner2.jpeg" alt="Hero Background" fill priority className="object-cover" sizes="100vw" quality={90} />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-500/90" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-20 relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <div className="space-y-6 sm:space-y-8 animate-entrance">
              <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-pink-500/20 backdrop-blur-md rounded-full border border-pink-500/30">
                <span className="text-pink-300 font-semibold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase">
                  #1 Transformation Formula
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tighter text-white">
                Transform Your Body in{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-500">90 Days</span>
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                Revolutionary science-backed formula that helps you shed pounds naturally, boost metabolism, and reclaim your confidence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Link href="#shop" className="inline-flex items-center justify-center rounded-xl transition-colors duration-300 font-bold whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 h-auto w-full sm:w-auto bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-700 shadow-2xl text-white active:scale-95">
                  Get Started Now
                </Link>
                <Button size="xl" variant="outline" className="w-full sm:w-auto text-base sm:text-lg border-white/30 text-white backdrop-blur-sm hover:bg-pink-500 hover:border-pink-500">
                  See Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE SECTION */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">The Core Difference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {['100% Natural', 'Rapid Metabolism', 'Sustained Energy', 'Non-Habit Forming'].map((title, i) => (
              <div key={i} className="text-center space-y-3 sm:space-y-4 p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 hover:border-pink-500 transition-all duration-300">
                <IconPlaceholder>
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </IconPlaceholder>
                <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Focused on long-term health and success.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOP PRODUCTS SECTION */}
      <section className="py-16 sm:py-24 bg-gray-950" id="shop">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4">Shop Our <span className="text-pink-500">Supplements</span></h2>
              <p className="text-base sm:text-lg text-gray-400">Premium solutions tailored for your transformation.</p>
            </div>
            <Link href="/cart" className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-2 bg-pink-500/10 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center">
              <span className="text-lg sm:text-xl">🛒</span> View Cart ({cartCount})
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setSelectedProduct}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>

        {/* COMPONENT: QUICK VIEW MODAL */}
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}
      </section>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(2rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-entrance {
          animation: slideIn 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}