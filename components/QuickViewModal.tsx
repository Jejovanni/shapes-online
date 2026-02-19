"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import Button from '@/components/Button'; // Importing the shared button

interface QuickViewModalProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount).replace('NGN', '₦');
};

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-gray-900 border-t sm:border border-gray-800 w-full max-w-3xl rounded-t-3xl sm:rounded-3xl overflow-hidden relative flex flex-col md:flex-row shadow-2xl max-h-[90vh] overflow-y-auto sm:max-h-none sm:overflow-visible">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-black/50 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex hover:bg-pink-500 transition-colors items-center justify-center text-sm sm:text-base"
                >
                    ✕
                </button>

                <div className="w-full md:w-1/2 aspect-square relative bg-gray-800 shrink-0">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-black mb-2">{product.name}</h2>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4">{formatNaira(product.price)}</p>
                    <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">{product.description}</p>

                    <div className="space-y-3 sm:space-y-4 mt-auto sm:mt-0">
                        {/* Using the shared Button here */}
                        <Button
                            onClick={() => { onAddToCart(product); onClose(); }}
                            variant="emerald"
                            className="w-full"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="outlineGray"
                            className="w-full"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}