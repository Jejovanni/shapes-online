"use client";
import React, { useState, useEffect } from 'react';

// --- START: TYPE DEFINITIONS (for JSDoc to avoid implicit 'any' errors) ---

/**
 * @typedef {object} ButtonProps
 * @property {React.ReactNode} children
 * @property {'lg' | 'xl'} [size]
 * @property {'default' | 'outline'} [variant]
 * @property {string} [className]
 * @property {object} [props] - Any other HTML button properties like onClick, disabled, etc.
 */

/**
 * @typedef {object} IconProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

// --- END: TYPE DEFINITIONS ---

// --- START: SHADCN/UI & FRAMER-MOTION SIMULATIONS ---

/**
 * Simulates the shadcn/ui Button component.
 * @param {ButtonProps} props
 */
const Button = ({ children, size, variant, className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-xl transition-colors duration-300 font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none";

  const sizeClasses = {
    lg: "text-lg px-8 py-4 h-auto",
    xl: "text-xl px-10 py-5 h-auto",
  };

  const variantClasses = {
    default: "bg-emerald-500 text-white hover:bg-emerald-600",
    outline: "bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white",
  };

  const finalSize = sizeClasses[size || 'lg'];
  const finalVariant = variantClasses[variant || 'default'];

  return (
    <button
      className={`${baseStyle} ${finalSize} ${finalVariant} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * @param {IconProps} props
 */
const IconPlaceholder = ({ children, className }) => (
  <div className={`p-4 rounded-full bg-emerald-500/20 text-emerald-400 ${className || ""}`}>
    {children}
  </div>
);

// --- END: SHADCN/UI & FRAMER-MOTION SIMULATIONS ---

const HeroSection = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const slideInStyle = isAnimated
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8";

  const products = [
    { name: "Metabolic Boost", price: "$49", description: "Accelerate fat loss with natural thermogenic compounds." },
    { name: "Night Detox", price: "$35", description: "Cleanse and repair while you sleep for a fresh start." },
    { name: "Essential Daily", price: "$29", description: "Comprehensive vitamins and minerals for optimal health." },
  ];

  const testimonials = [
    { quote: "Lost 25lbs in 90 days! I feel like a new person.", name: "Sarah K.", image: "https://placehold.co/100x100/34D399/ffffff?text=SK" },
    { quote: "The energy boost is incredible. Highly recommend!", name: "David L.", image: "https://placehold.co/100x100/34D399/ffffff?text=DL" },
    { quote: "Finally, a natural formula that actually works.", name: "Jenna P.", image: "https://placehold.co/100x100/34D399/ffffff?text=JP" },
  ];

  return (
    <main className="bg-gray-900 text-white font-sans min-h-screen">
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/Shapes_Banner2.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Tint Overlay: Gradient from dark to slightly lighter to let the image show while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/95" />

          {/* Optional Accent Glows */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(52,211,153,0.15),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 py-20 relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">

            <div className={`space-y-8 transition-all duration-1000 ease-out ${slideInStyle}`}>
              <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30">
                <span className="text-emerald-400 font-semibold text-xs sm:text-sm tracking-widest uppercase">
                  #1 Transformation Formula
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tighter text-white">
                Transform Your Body in{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-500">
                  90 Days
                </span>
              </h1>

              <p className="text-lg sm:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                Revolutionary science-backed formula that helps you shed pounds naturally,
                boost metabolism, and reclaim your confidence.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-2xl shadow-emerald-500/40 text-lg font-bold"
                >
                  Get Started Now
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto text-lg font-semibold border-white/30 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900"
                >
                  See Results
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-6 pt-10">
                <div className="text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">50K+</div>
                  <div className="text-sm text-gray-300 font-medium">Success Stories</div>
                </div>
                <div className="h-10 w-px bg-white/20 hidden sm:block" />
                <div className="text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">4.9★</div>
                  <div className="text-sm text-gray-300 font-medium">Customer Rating</div>
                </div>
                <div className="h-10 w-px bg-white/20 hidden sm:block" />
                <div className="text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl font-extrabold text-pink-400">100%</div>
                  <div className="text-sm text-gray-300 font-medium">Natural Formula</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VALUE/BENEFITS BANNER SECTION */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">The Core Difference</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">100% Natural</h3>
              <p className="text-gray-400 text-sm">Sourced from the purest ingredients with zero synthetic fillers.</p>
            </div>
            <div className="text-center space-y-4 p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">Rapid Metabolism</h3>
              <p className="text-gray-400 text-sm">Scientifically proven to boost your body's fat-burning engine.</p>
            </div>
            <div className="text-center space-y-4 p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM21 12c0 1.258-1.574 2.37-3.92 2.723A8.995 8.995 0 0112 21c-4.48 0-8.214-2.887-9.52-6.277C1.574 14.37 0 13.258 0 12c0-5.523 5.373-10 12-10s12 4.477 12 10z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">Sustained Energy</h3>
              <p className="text-gray-400 text-sm">Avoid the jitters and crashes with smooth, all-day vitality.</p>
            </div>
            <div className="text-center space-y-4 p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">Non-Habit Forming</h3>
              <p className="text-gray-400 text-sm">Safe to use daily without creating dependency or tolerance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS SECTION */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">Hear From Our <span className="text-emerald-500">Success Stories</span></h2>
          <p className="text-lg text-center text-gray-400 max-w-2xl mx-auto mb-16">Real results from real people who achieved their body goals in 90 days.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6 flex flex-col justify-between border-t-4 border-emerald-500/50">
                <p className="text-lg italic text-gray-300">
                  "{t.quote}"
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <img
                    src={t.image}
                    alt={`Profile of ${t.name}`}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/100x100/34D399/ffffff?text=User"; }}
                  />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-emerald-400">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">Our <span className="text-pink-500">Featured</span> Products</h2>
          <p className="text-lg text-center text-gray-400 max-w-2xl mx-auto mb-16">Complement your transformation with our best-selling natural supplements.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-2xl shadow-2xl space-y-4 hover:shadow-emerald-500/20 transition-all duration-300">
                <img
                  src={`https://placehold.co/400x300/1e293b/d1d5db?text=${encodeURIComponent(p.name)}`}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-700"
                />
                <h3 className="text-2xl font-bold text-white">{p.name}</h3>
                <p className="text-emerald-400 text-3xl font-extrabold">{p.price}</p>
                <p className="text-gray-400">{p.description}</p>
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-gray-800 p-8 sm:p-16 rounded-3xl text-center border-t-8 border-emerald-500 shadow-3xl">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
              Ready to See Your <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">90-Day Transformation</span>?
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
              Stop waiting for change. Start your journey today and join over 50,000 satisfied customers.
            </p>
            <Button
              size="xl"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-2xl shadow-emerald-500/40 text-lg font-bold transition-transform duration-300 hover:scale-[1.03]"
            >
              Secure Your 90-Day Kit Now
            </Button>
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(0); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
          }
        `}
      </style>
    </main>
  );
};

export default HeroSection;