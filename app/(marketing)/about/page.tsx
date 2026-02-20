"use client";

import React, { ReactNode } from 'react'; // This line is the fix
import Image from 'next/image';
import { ShieldCheck, Target, MessageSquareText } from 'lucide-react';

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

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
          Our Story: The Art of Weight Loss
        </h1>
        <h3 className="text-xl text-gray-700 max-w-4xl mx-auto">
          We aren't just a lifestyle brand, we're dedicated to helping you achieve healthy, sustainable weight loss, and empowering you to live your best life.
        </h3>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-100/50 p-8 rounded-3xl shadow-inner border border-gray-200 mb-16">
        <div className="lg:order-2 w-full">
          {/* Aspect ratio container to maintain visual consistency */}
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl bg-gray-200 aspect-video lg:aspect-square flex items-center justify-center">
            <Image
              src="/images/Shapes_lagos_About.JPG"
              alt="Shapes Lagos product line showcasing high-quality vector assets"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority={true} // Set to true if this is "above the fold" (top of the page)
            />
          </div>
        </div>

        <div className="lg:order-1">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b border-pink-300/50 pb-2">
            Built on Precision and Passion
          </h2>
          <p className="text-gray-600 mb-4 text-lg">
            With roots tracing back to 2015, Shapes Lagos has grown to become the number one weight loss brand on the continent, trusted by thousands for effective, results-driven solutions. Our passion for wellness drives us to keep pushing boundaries, so you can achieve your goals with confidence.
          </p>
          <p className="text-gray-600 text-lg">
            Our mission is simple: YOU MUST LOSE WEIGHT AND SLAY! This is the unshakable ethos behind Shapes Lagos that has allowed us to maintain our unparalleled consistency and quality of service and product for over a decade.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ValueCard 
            icon={<ShieldCheck className="h-10 w-10 text-pink-600" />}
            title="Uncompromising Quality"
            description="At Shapes Lagos, we stand behind the quality of our products, and every item is meticulously checked to ensure it meets our uncompromising standards for product integrity, so you can trust what you put in your body"
          />
          <ValueCard 
            icon={<Target className="h-10 w-10 text-pink-600" />}
            title="Unfailing Precision"
            description="At Shapes Lagos, we craft every product with unfailing precision, delivering results you can trust. "
          />
          <ValueCard 
            icon={<MessageSquareText className="h-10 w-10 text-pink-600" />}
            title="Instant Accessibility"
            description="At Shapes Lagos, we prioritize instant accessibility, ensuring our team is always ready to address your questions and help troubleshoot any issues, so you get the support you need, fast. "
          />
        </div>
      </section>

      {/* Team/CTA Section */}
      <section className="bg-black text-pink-400 p-10 rounded-2xl shadow-xl border border-pink-700/50 text-center">
        <h2 className="text-3xl font-extrabold mb-4">
          Join the Weight Loss Revolution
        </h2>
        <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
          We believe the best transformations start with the right balance. Start exploring our weight loss solutions today and find the precise support you need to reach your goals.
        </p>
        <a 
          href="/#shop" 
          className="inline-block px-8 py-3 bg-pink-600 text-black font-bold rounded-full shadow-lg hover:bg-pink-400 transition transform hover:scale-105"
        >
          View All Products
        </a>
      </section>

    </div>
  );
}

// Helper Component for Core Values
const ValueCard = ({ icon, title, description }: ValueCardProps) => (
  <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);