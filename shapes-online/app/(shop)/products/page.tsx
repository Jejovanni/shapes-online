"use client";

import React from 'react';

// --- Mock Data for the Catalog ---

const MOCK_PRODUCTS = [
    { id: 'neo-prism', title: 'Neo-Prism Set', price: 29.99, image: 'https://placehold.co/400x400/F472B6/111?text=Neo+Prism' },
    { id: 'abstract-flow', title: 'Abstract Flow Pack V2', price: 49.99, image: 'https://placehold.co/400x400/93C5FD/111?text=Flow+Pack' },
    { id: 'sphere-kit', title: 'Gradient Sphere Kit', price: 34.99, image: 'https://placehold.co/400x400/FDBA74/111?text=Sphere+Kit' },
    { id: 'minimalist-lines', title: 'Minimalist Lines', price: 14.99, image: 'https://placehold.co/400x400/6EE7B7/111?text=Minimal+Lines' },
    { id: 'cyber-grids', title: 'Cyber Grids Vol. 1', price: 39.99, image: 'https://placehold.co/400x400/7C3AED/111?text=Cyber+Grids' },
    { id: 'liquid-blobs', title: 'Liquid Blobs Collection', price: 24.99, image: 'https://placehold.co/400x400/FFD43B/111?text=Liquid+Blobs' },
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
                <h1 className="text-4xl font-extrabold text-pink-600">All Shapes & Vector Packs</h1>
                <p className="text-lg text-gray-500 mt-2">Browse the complete collection of geometric designs.</p>
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

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {MOCK_PRODUCTS.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </div>
    );
}