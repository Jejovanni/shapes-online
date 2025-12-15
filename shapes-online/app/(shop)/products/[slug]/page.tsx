"use client";

import React, { useState } from 'react';
import { ShoppingCart, Heart, Minus, Plus, CheckCircle, Star } from 'lucide-react';

// --- Reusable Product Card Component (For Landing Page/Catalog) ---

interface ProductCardProps {
    product: {
        id: string;
        title: string;
        price: number;
        image: string;
    };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
                    // Note: In a real app, this should probably use a client-side routing component
                    onClick={(e) => { e.preventDefault(); /* Add to Cart logic */ }}
                    className="mt-3 text-sm font-semibold text-black bg-pink-300 hover:bg-pink-400 w-full py-1.5 rounded-full transition"
                >
                    View Details
                </button>
            </div>
        </a>
    );
};


// --- Product Details Page Component (The Main Page Content) ---

interface ProductPageProps {
    params: {
        slug: string;
    };
}

// Mock Data for the Detailed Product View
const mockProduct = {
    id: 'abstract-flow',
    title: 'Abstract Flow Vector Pack V2',
    price: 49.99,
    description: "A stunning collection of 50 high-resolution geometric and liquid vector assets. Perfect for web backgrounds, print materials, and social media campaigns. Includes AI, EPS, and PNG formats.",
    details: [
        "50 unique vector files",
        "Scalable to any size (Vector)",
        "Commercial and personal license included",
        "Instant download after purchase",
        "Optimized for dark and light backgrounds",
    ],
    reviews: 4.8,
    reviewCount: 155,
    images: [
        "https://placehold.co/800x600/F472B6/111?text=Main+Image",
        "https://placehold.co/800x600/93C5FD/111?text=Detail+View+1",
        "https://placehold.co/800x600/FDBA74/111?text=Detail+View+2",
    ],
    sku: 'SHP-AFV2',
};


const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(mockProduct.images[0]);

    const handleAddToCart = () => {
        console.log(`Adding ${quantity} of ${params.slug} to cart.`);
        // Actual API call/context update goes here
    };

    const formattedPrice = `$${mockProduct.price.toFixed(2)}`;

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumbs (Placeholder) */}
                <nav className="text-sm text-gray-500 mb-6">
                    <a href="/products" className="hover:text-pink-600">Products</a> /
                    <span className="text-pink-600 font-medium"> {mockProduct.title}</span>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-12">

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                            <img
                                src={activeImage}
                                alt={mockProduct.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/D1D5DB/4B5563?text=Product+Image+Error"; }}
                            />
                        </div>
                        {/* Thumbnail Navigation */}
                        <div className="flex space-x-3 overflow-x-auto">
                            {mockProduct.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition duration-200 border-2 ${img === activeImage ? 'border-pink-600 shadow-lg' : 'border-gray-200 hover:border-pink-300'
                                        }`}
                                    onClick={() => setActiveImage(img)}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/D1D5DB/4B5563?text=Thumb"; }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details & Actions */}
                    <div className="mt-8 lg:mt-0 lg:sticky lg:top-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{mockProduct.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 fill-current ${i < Math.floor(mockProduct.reviews) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm font-medium">
                                {mockProduct.reviews.toFixed(1)} ({mockProduct.reviewCount} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <p className="text-5xl font-extrabold text-pink-600 mb-6">{formattedPrice}</p>

                        {/* Description */}
                        <p className="text-gray-700 text-lg mb-8">{mockProduct.description}</p>

                        {/* Key Details List */}
                        <ul className="space-y-2 mb-8 text-gray-600">
                            {mockProduct.details.map((detail, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-lg font-semibold text-gray-800">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-gray-100 transition text-gray-700"
                                >
                                    <Minus className="h-5 w-5" />
                                </button>
                                <span className="px-5 text-lg font-medium text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:bg-gray-100 transition text-gray-700"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-pink-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-[1.01] duration-300"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                className="p-3 border-2 border-pink-200 text-pink-600 rounded-full hover:bg-pink-50 transition duration-300"
                                aria-label="Add to Wishlist"
                            >
                                <Heart className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Sections (e.g., Reviews) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-pink-300/50 pb-2">
                    Customer Reviews
                </h2>
                <div className="bg-gray-100 p-8 rounded-xl">
                    <p className="text-gray-700">Review section content would go here. Load component for user reviews and submissions.</p>
                </div>
            </section>

        </div>
    );
};

export default ProductPage;