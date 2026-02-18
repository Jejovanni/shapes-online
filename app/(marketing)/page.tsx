"use client";

import React, { useState, useEffect, ReactNode, ButtonHTMLAttributes } from 'react';
import { Product, CartItem } from '@/types'; // Assumes you created types/index.ts
import Link from 'next/link';
import Image from 'next/image';

// --- HELPER: Currency Formatter ---
// This ensures your database/math uses numbers (415000), but users see (₦415,000)
const formatNaira = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
};

// --- TYPES for Local Components ---

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'lg' | 'xl';
  variant?: 'default' | 'outline';
  className?: string;
}

interface IconProps {
  children: ReactNode;
  className?: string;
}

// --- LOCAL COMPONENTS ---

const Button = ({
  children,
  size = 'lg',
  variant = 'default',
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyle = "inline-flex items-center justify-center rounded-xl transition-colors duration-300 font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none";

  const sizeClasses = {
    lg: "text-lg px-8 py-4 h-auto",
    xl: "text-xl px-10 py-5 h-auto",
  };

  const variantClasses = {
    default: "bg-pink-500 text-white hover:bg-pink-600",
    outline: "bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white",
  };

  return (
    <button
      className={`${baseStyle} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const IconPlaceholder = ({ children, className = "" }: IconProps) => (
  <div className={`p-4 rounded-full bg-pink-500/20 text-pink-400 ${className}`}>
    {children}
  </div>
);

// --- MAIN PAGE COMPONENT ---

const HeroSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  // 1. Initialize Cart Count on Mount
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

  // 2. Data Source (Prices are strictly numbers)
  const products: Product[] = [
    {
      id: "1",
      name: "Shapes Lagos Premium kit",
      price: 415000,
      description: "The 90 days total weightloss wellness plan, the top of our product line.",
      image: "/images/IMG-20251029-WA0002.jpg"
    },
    {
      id: "2",
      name: "Shapes Lagos Signature Kit",
      price: 140000,
      description: "Contains the new and improved Bum & slim tea. All natural ingredients.",
      image: "/images/IMG-20251030-WA0003.jpg"
    },
    {
      id: "3",
      name: "VVIP Kit with Coffee & Protein Shake",
      price: 116000,
      description: "Contains a comprehensive weight loss regimen including the skinny coffee and protein shake for healthy nutrition.",
      image: "/images/IMG-20251030-WA0001.jpg"
    },
    {
      id: "4",
      name: "VVIP Kit with Coffee",
      price: 95000,
      description: "High-quality plant-based products to blast tummy fat.",
      image: "/images/IMG-20251030-WA0002.jpg"
    },
  ];

  // 3. Add to Cart Logic
  const addToCart = (product: Product) => {
    try {
      const savedCart = localStorage.getItem('cart');
      const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

      const existingItemIndex = currentCart.findIndex((item) => item.id === product.id);
      let newCart: CartItem[];

      if (existingItemIndex > -1) {
        // If item exists, we increment quantity instead of ignoring it
        newCart = [...currentCart];
        newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
      } else {
        // Add new item with quantity 1
        newCart = [...currentCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      setCartCount(newCart.length);
      
      // Dispatch event so Navbar/Checkout knows cart updated
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Optional: Add a simple alert or toast here
      // alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  return (
    <main className="bg-gray-900 text-white font-sans min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Shapes_Banner2.jpeg"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-500/90" />
        </div>

        <div className="container mx-auto px-6 md:px-12 py-20 relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <div className="space-y-8 animate-entrance">
              <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-pink-500/20 backdrop-blur-md rounded-full border border-pink-500/30">
                <span className="text-pink-300 font-semibold text-xs sm:text-sm tracking-widest uppercase">
                  #1 Transformation Formula
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tighter text-white">
                Transform Your Body in{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-500">
                  90 Days
                </span>
              </h1>

              <p className="text-lg sm:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                Revolutionary science-backed formula that helps you shed pounds naturally,
                boost metabolism, and reclaim your confidence.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="#shop"
                  className="inline-flex items-center justify-center rounded-xl transition-colors duration-300 font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-xl px-10 py-5 h-auto w-full sm:w-auto bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-700 shadow-2xl text-white font-bold"
                >
                  Get Started Now
                </Link>

                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto text-lg font-semibold border-white/30 text-white backdrop-blur-sm hover:bg-pink-500"
                >
                  See Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE SECTION */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">The Core Difference</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['100% Natural', 'Rapid Metabolism', 'Sustained Energy', 'Non-Habit Forming'].map((title, i) => (
              <div key={i} className="text-center space-y-4 p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 hover:border-pink-500 transition-all duration-300">
                <IconPlaceholder>
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </IconPlaceholder>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-400 text-sm">Focused on long-term health and success.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOP PRODUCTS SECTION */}
      <section className="py-24 bg-gray-950" id="shop">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="text-left">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Shop Our <span className="text-pink-500">Supplements</span></h2>
              <p className="text-lg text-gray-400">Premium solutions tailored for your transformation.</p>
            </div>
            <Link href="/checkout" className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-2 bg-pink-500/10 px-4 py-2 rounded-lg transition-colors">
              <span className="text-xl">🛒</span> View Cart ({cartCount})
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition-all duration-300 flex flex-col h-full">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-800 group">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm z-10"
                  >
                    Quick View
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                  {/* Currency Formatter Used Here */}
                  <p className="text-pink-400 text-2xl font-black mb-3">{formatNaira(p.price)}</p>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">{p.description}</p>
                  
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK VIEW MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-3xl rounded-3xl overflow-hidden relative flex flex-col md:flex-row shadow-2xl">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-4 right-4 z-20 bg-black/50 text-white w-10 h-10 rounded-full flex hover:bg-pink-500 transition-colors items-center justify-center"
              >✕</button>
              
              <div className="w-full md:w-1/2 aspect-square relative bg-gray-800">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-black mb-2">{selectedProduct.name}</h2>
                <p className="text-2xl font-bold text-emerald-400 mb-4">{formatNaira(selectedProduct.price)}</p>
                <p className="text-gray-400 mb-8 leading-relaxed">{selectedProduct.description}</p>
                <div className="space-y-4">
                    <button 
                        onClick={() => {
                            addToCart(selectedProduct);
                            setSelectedProduct(null);
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
                    >
                        Add to Cart
                    </button>
                    <Button 
                        onClick={() => setSelectedProduct(null)} 
                        className="w-full" 
                        variant="outline"
                    >
                        Close
                    </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Animation Styles */}
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
};

export default HeroSection;