import React from 'react';

export const Footer = () => {
    // Using black for the background (bg-black) and pink for the text (text-pink-400)
    return (
        <footer className="bg-black text-pink-400 border-t border-pink-900/50 mt-12">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">

                {/* Top Section: Navigation Links */}
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 border-b border-pink-900 pb-6 mb-6">

                    {/* Column 1: Shopping */}
                    <div>
                        <p className="font-semibold text-pink-600 uppercase tracking-wider mb-3">Shop</p>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/products" className="hover:text-pink-100 transition duration-300">All Products</a></li>
                            <li><a href="/categories/electronics" className="hover:text-pink-100 transition duration-300">Electronics</a></li>
                            <li><a href="/categories/fashion" className="hover:text-pink-100 transition duration-300">Fashion</a></li>
                            <li><a href="/sale" className="hover:text-pink-100 transition duration-300 text-red-400">Seasonal Sale</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Customer Service */}
                    <div>
                        <p className="font-semibold text-pink-600 uppercase tracking-wider mb-3">Help & Support</p>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/account" className="hover:text-pink-100 transition duration-300">My Account</a></li>
                            <li><a href="/orders" className="hover:text-pink-100 transition duration-300">Track Order</a></li>
                            <li><a href="/returns" className="hover:text-pink-100 transition duration-300">Returns & Refunds</a></li>
                            <li><a href="/faq" className="hover:text-pink-100 transition duration-300">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <p className="font-semibold text-pink-600 uppercase tracking-wider mb-3">Company</p>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-pink-100 transition duration-300">Our Story</a></li>
                            <li><a href="/careers" className="hover:text-pink-100 transition duration-300">Careers</a></li>
                            <li><a href="/contact" className="hover:text-pink-100 transition duration-300">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Signup / Social */}
                    <div className="lg:col-span-1">
                        <p className="font-semibold text-pink-600 uppercase tracking-wider mb-3">Stay Connected</p>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="hover:text-pink-100 transition duration-300">
                                {/* Placeholder for social icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-pink-100 transition duration-300">
                                {/* Placeholder for social icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.5" y1="6.5" y2="6.5" /></svg>
                            </a>
                        </div>
                        <p className="mt-4 text-xs text-pink-500">
                            Sign up for pink-themed updates!
                        </p>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="text-center text-sm text-pink-500 pt-4">
                    <p>&copy; {new Date().getFullYear()} Shapes Online. All rights reserved. <span className="hidden sm:inline">| Built for modern e-commerce.</span></p>
                </div>
            </div>
        </footer>
    );
};