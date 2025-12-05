"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// In a real Next.js project, you would replace the local components below
// with imports from your external libraries, like:
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button'; 
// import { CheckCircle, Zap, Leaf } from 'lucide-react';

// --- START: SHADCN/UI & FRAMER-MOTION SIMULATIONS ---

/**
 * Simulates the shadcn/ui Button component.
 * In a real project, this would be an import.
 */
const Button = ({ children, size, variant, className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-xl transition-colors duration-300 font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none";

  const sizeClasses = {
    // Mobile-first sizing established by the base px/py
    lg: "text-lg px-8 py-4 h-auto",
    xl: "text-xl px-10 py-5 h-auto",
  };

  const variantClasses = {
    default: "bg-emerald-500 text-white hover:bg-emerald-600",
    outline: "bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white",
  };

  const finalSize = sizeClasses[size] || sizeClasses.lg;
  const finalVariant = variantClasses[variant] || variantClasses.default;

  return (
    <button
      className={`${baseStyle} ${finalSize} ${finalVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// State and CSS classes simulate framer-motion's initial/animate props.
const IconPlaceholder = ({ children, className }) => (
  <div className={`p-4 rounded-full bg-emerald-500/20 text-emerald-400 ${className}`}>
    {children}
  </div>
);

// --- END: SHADCN/UI & FRAMER-MOTION SIMULATIONS ---

const HeroSection = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsAnimated(true);
  }, []);

  // Tailwind/CSS classes to simulate the framer-motion effects
  const slideInStyle = isAnimated
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-12";

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

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background radial gradients for visual depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(52,211,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,146,60,0.1),transparent_50%)]" />

        <div className="container mx-auto px-6 md:px-12 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-1 gap-16 items-center">

            {/* Main Content Column (Simulated motion.div for text) */}
            <div
              className={`space-y-8 transition-all duration-1000 ease-out ${slideInStyle}`}
            >

              {/* Tag/Badge (Mobile-first padding and font size) */}
              <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                <span className="text-emerald-400 font-semibold text-xs sm:text-sm tracking-widest uppercase">
                  #1 Transformation Formula
                </span>
              </div>

              {/* Title (Mobile-first font size, scaling up significantly) */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tighter max-w-full lg:max-w-4xl">
                Transform Your Body in{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-green-600">
                  90 Days
                </span>
              </h1>

              {/* Description (Mobile-first text size and container width) */}
              <p className="text-base sm:text-xl text-gray-400 leading-relaxed max-w-full lg:max-w-3xl">
                Revolutionary science-backed formula that helps you shed pounds naturally,
                boost metabolism, and reclaim your confidence.
              </p>

              {/* Call-to-Action Buttons (Defaulting to stacked column on mobile, row on small screens) */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 text-lg font-bold"
                >
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg font-semibold border-emerald-500 text-emerald-400 hover:text-white hover:bg-emerald-500"
                >
                  See Results
                </Button>
              </div>

              {/* Stats/Metrics (Uses flex-wrap to ensure wrapping on small screens) */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-500">50K+</div>
                  <div className="text-sm text-gray-500">Success Stories</div>
                </div>
                <div className="h-10 w-px bg-gray-700/50" />
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-500">4.9★</div>
                  <div className="text-sm text-gray-500">Customer Rating</div>
                </div>
                <div className="h-10 w-px bg-gray-700/50" />
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-pink-500">100%</div>
                  <div className="text-sm text-gray-500">Natural Formula</div>
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
            {/* Benefit 1 */}
            <div className="text-center space-y-4 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">100% Natural</h3>
              <p className="text-gray-400 text-sm">Sourced from the purest ingredients with zero synthetic fillers.</p>
            </div>
            {/* Benefit 2 */}
            <div className="text-center space-y-4 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">Rapid Metabolism</h3>
              <p className="text-gray-400 text-sm">Scientifically proven to boost your body's fat-burning engine.</p>
            </div>
            {/* Benefit 3 */}
            <div className="text-center space-y-4 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM21 12c0 1.258-1.574 2.37-3.92 2.723A8.995 8.995 0 0112 21c-4.48 0-8.214-2.887-9.52-6.277C1.574 14.37 0 13.258 0 12c0-5.523 5.373-10 12-10s12 4.477 12 10z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">Sustained Energy</h3>
              <p className="text-gray-400 text-sm">Avoid the jitters and crashes with smooth, all-day vitality.</p>
            </div>
            {/* Benefit 4 */}
            <div className="text-center space-y-4 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
              <IconPlaceholder>
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2z"></path></svg>
              </IconPlaceholder>
              <h3 className="text-xl font-semibold">Non-Habit Forming</h3>
              <p className="text-gray-400 text-sm">Safe to use daily without creating dependency or tolerance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS SECTION (Image Carousel Simulation) */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">Hear From Our <span className="text-emerald-500">Success Stories</span></h2>
          <p className="text-lg text-center text-gray-400 max-w-2xl mx-auto mb-16">Real results from real people who achieved their body goals in 90 days.</p>

          {/* Testimonial Grid/Carousel Simulation (Responsive Grid) */}
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
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/34D399/ffffff?text=User"; }}
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
                <image
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

    </main>
  );
};

export default HeroSection;