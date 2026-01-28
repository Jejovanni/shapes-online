"use client";

import React from 'react';
import Image from 'next/image';
import { Sparkles, Dna, Layers } from 'lucide-react';

/**
 * About Us Page Content (route: /about)
 * This content will be rendered inside the Marketing Layout.
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <section className="text-center mb-16 pt-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 mb-4">
          Our Story: The Art of Geometry
        </h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto">
          We are more than just an e-commerce store; we are a dedicated collective built around the beauty and power of abstract design.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-100/50 p-8 rounded-3xl shadow-inner border border-gray-200 mb-16">
        <div className="lg:order-2 w-full">
          {/* Aspect ratio container to maintain visual consistency */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-200 aspect-video lg:aspect-square flex items-center justify-center">
            <img
              src="/images/Shapes_lagos_About.JPG"
              alt="Shapes Lagos product line showcasing high-quality vector assets"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              // Fallback to placeholder if local image is missing
              onError={(e) => {
                const target = e.currentTarget;
                target.src = "https://placehold.co/800x800/db2777/FFF?text=Shapes+Lagos+Vision";
              }}
            />
          </div>
        </div>

        <div className="lg:order-1">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b border-pink-300/50 pb-2">
            Built on Precision and Passion
          </h2>
          <p className="text-gray-600 mb-4 text-lg">
            Shapes Online was founded in 2023 by a small team of graphic designers who shared a common frustration: finding high-quality, perfectly rendered vector shapes for their projects was a struggle. We decided to solve that problem ourselves.
          </p>
          <p className="text-gray-600 text-lg">
            Our mission is simple: to provide the global creative community with an unparalleled library of geometric assets, abstract backgrounds, and minimal art that is ready-to-use, fully scalable, and commercially licensed.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ValueCard 
            icon={<Sparkles className="h-10 w-10 text-pink-600" />}
            title="Uncompromising Quality"
            description="Every asset is meticulously checked for vector integrity, perfect curves, and clean edges."
          />
          <ValueCard 
            icon={<Dna className="h-10 w-10 text-pink-600" />}
            title="Creative Freedom"
            description="We offer flexible licensing so you can use our designs for personal and commercial projects without worry."
          />
          <ValueCard 
            icon={<Layers className="h-10 w-10 text-pink-600" />}
            title="Instant Accessibility"
            description="Digital delivery means no waiting. Download and integrate your new shapes into your workflow immediately."
          />
        </div>
      </section>

      {/* Team/CTA Section */}
      <section className="bg-black text-pink-400 p-10 rounded-2xl shadow-xl border border-pink-700/50 text-center">
        <h2 className="text-3xl font-extrabold mb-4">
          Join the Geometry Revolution
        </h2>
        <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
          We believe the best creations start with the perfect shape. Start exploring our collections today and find the precise elements you need.
        </p>
        <a 
          href="/products" 
          className="inline-block px-8 py-3 bg-pink-600 text-black font-bold rounded-full shadow-lg hover:bg-pink-400 transition transform hover:scale-105"
        >
          View All Products
        </a>
      </section>

    </div>
  );
}

// Helper Component for Core Values
const ValueCard = ({ icon, title, description }) => (
  <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);