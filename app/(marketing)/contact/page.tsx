"use client";

import React, { ReactNode } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

/**
 * Props for the ContactDetail component
 */
interface ContactDetailProps {
  icon: ReactNode;
  title: string;
  content: string;
  link: string;
}

export default function ContactPage() {

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">

      {/* Hero Header */}
      <section className="text-center mb-16 pt-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto">
          We&apos;re here to help you with orders, design questions, or custom requests.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* WhatsApp Chat Link Section (2/3 width on large screens) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center min-h-[300px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg">
            Chat with our sales and support team directly on WhatsApp for the fastest response to your questions about orders, products, or custom shapes.
          </p>
          <a
            href="https://wa.me/+2348163114858"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          >
            <Phone className="h-6 w-6" />
            <span>Start WhatsApp Chat</span>
          </a>
          <p className="text-sm text-gray-400 mt-4">
            You will be redirected to WhatsApp Web or the WhatsApp app.
          </p>
        </div>

        {/* Contact Info & Details (1/3 width on large screens) */}
        <div className="lg:col-span-1 space-y-8 p-6 bg-black rounded-2xl shadow-xl text-pink-400 border border-pink-900/50">
          <h2 className="text-3xl font-bold text-pink-500 mb-4">Contact Details</h2>

          <ContactDetail icon={<Mail className="h-6 w-6" />} title="Email Support" content="support@shapesonline.com" link="mailto:support@shapesonline.com" />
          <ContactDetail icon={<Phone className="h-6 w-6" />} title="Sales Line" content="+2348163114858" link="tel:+2348163114858" />
          <ContactDetail
            icon={<MapPin className="h-6 w-6" />}
            title="Studio Location"
            content="Lagos, Nigeria"
            link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4267006063474!2d3.636267275461836!3d6.467506393524195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf99b9432ffcd%3A0x14ad703b1f0d93eb!2sNovare%20Mall%2C%20shoprite!5e0!3m2!1sen!2sng!4v1771608455669!5m2!1sen!2sng"
          />

          <div className="pt-4">
            <h3 className="text-xl font-semibold text-pink-500 mb-3">Operating Hours</h3>
            <p className="text-gray-300">Monday - Friday: 9am - 5pm WAT</p>
            <p className="text-gray-300">Weekends: Closed</p>
          </div>
        </div>
      </div>

      {/* Functional Map Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Find Our Headquarters</h2>
        {/* We use overflow-hidden here so the iframe doesn't break out of the rounded corners */}
        <div className="h-96 w-full bg-gray-200 rounded-2xl shadow-inner border border-gray-300 overflow-hidden relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4267006063474!2d3.636267275461836!3d6.467506393524195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf99b9432ffcd%3A0x14ad703b1f0d93eb!2sNovare%20Mall%2C%20shoprite!5e0!3m2!1sen!2sng!4v1771608455669!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </section>

    </div>
  );
}

// Helper Component for Contact Details
const ContactDetail = ({ icon, title, content, link }: ContactDetailProps) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 text-pink-600">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-pink-500">{title}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-100 transition duration-300 block">
        {content}
      </a>
    </div>
  </div>
);