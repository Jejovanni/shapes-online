"use client";

import React from 'react';
import {ProductCards} from '@/components/product/ProductCards';

// --- Mock Data for the Catalog ---

const MOCK_PRODUCTS = [
    { id: 'neo-prism', title: 'Premium Kit', price: 29.99, image: 'images/IMG-20251029-WA0002.jpg' },
    { id: 'abstract-flow', title: 'VVIP Kit with Coffee & Protein Shake', price: 49.99, image: 'images/IMG-20251030-WA0001.jpg' },
    { id: 'sphere-kit', title: 'VVIP Kit with Coffee', price: 34.99, image: 'images/IMG-20251030-WA0002.jpg' },
    { id: 'minimalist-lines', title: 'Signature Kit', price: 140000, image: 'images/IMG-20251030-WA0003.jpg' },
];

// --- Minimal Product Card Component (for runnability) ---
// NOTE: In a real app, you would import the definitive ProductCard from '../[slug]/page'.

const ProductCard = ({ product }) => {
    const formattedPrice = `$${product.price.toFixed(2)}`;

    return (
        <a href={`/products/${product.id}`} className="block group bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100">
            <div className="aspect-square overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/D1D5DB/4B5563?text=Image+Missing"; }}
                />
            </div>
            <div className="p-4 text-center">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition duration-300">{product.title}</h4>
                <p className="text-pink-700 font-extrabold mt-1 text-xl">{formattedPrice}</p>
                <button
                    onClick={(e) => { e.preventDefault(); console.log(`Adding ${product.id} to cart (placeholder)`); }}
                    className="mt-3 text-sm font-semibold text-black bg-pink-300 hover:bg-pink-400 w-full py-1.5 rounded-full transition"
                >
                    View Details
                </button>
            </div>
        </a>
    );
};

// --- Main Products Catalog Page ---

export default function ProductsCatalogPage() {
    return (
        <div className="space-y-10">

            {/* Page Header */}
            <header className="text-center py-6 border-b border-gray-200">
                <h1 className="text-4xl font-extrabold text-pink-600">All Shapes Lagos Kits</h1>
                <p className="text-lg text-gray-500 mt-2">Browse the complete collection weight loss kits.</p>
            </header>

            {/* Filters/Sort (Placeholder) */}
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-medium">{MOCK_PRODUCTS.length} Products Found</span>
                <div className="flex items-center space-x-2">
                    <label htmlFor="sort" className="text-sm text-gray-600">Sort By:</label>
                    <select id="sort" className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-pink-500 focus:border-pink-500">
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>
            <ProductCards />

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {MOCK_PRODUCTS.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </div>
    );
}