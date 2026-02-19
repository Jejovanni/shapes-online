"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import Button from '@/components/Button'; // Importing the shared button

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
    onAddToCart: (product: Product) => void;
}

const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount).replace('NGN', '₦');
};

export default function ProductCard({ product, onQuickView, onAddToCart }: ProductCardProps) {
    return (
        <div className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition-all duration-300 flex flex-col h-full w-full">

            <div className="relative aspect-square overflow-hidden bg-gray-800 group">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                    onClick={() => onQuickView(product)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold backdrop-blur-sm z-10"
                >
                    Quick View
                </button>
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-pink-400 text-xl sm:text-2xl font-black mb-3">{formatNaira(product.price)}</p>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 flex-grow">{product.description}</p>

                {/* Using the shared Button here */}
                <Button
                    onClick={() => onAddToCart(product)}
                    variant="emerald"
                    size="md"
                    className="w-full"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}