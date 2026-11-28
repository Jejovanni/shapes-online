import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ResultsPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // List all images from the testimonials bucket
    const { data: files, error } = await supabase.storage
        .from('testimonials')
        .list('', {
            limit: 100,
            sortBy: { column: 'created_at', order: 'desc' },
        });

    // Filter valid image files (ignore placeholder or system folders)
    const validImageFiles = (files || []).filter(
        (file) => file.name && !file.name.startsWith('.') && /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name)
    );

    // Generate public URLs for each
    const images = validImageFiles.map((file) => {
        const { data: { publicUrl } } = supabase.storage
            .from('testimonials')
            .getPublicUrl(file.name);
        return {
            name: file.name,
            url: publicUrl,
        };
    });

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans pt-24 pb-20">
            {/* HERO HEADER */}
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mb-14 md:mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
                    <Sparkles size={16} /> Real People. Real Results.
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white mb-6">
                    Transformation <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-500">Stories</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Swipe through real proof and verified results from men and women across Nigeria and beyond who transformed their bodies with Shapes Lagos.
                </p>

                {/* Rating proof badge */}
                <div className="flex items-center justify-center gap-1 mt-6 text-pink-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                    ))}
                    <span className="text-gray-300 text-sm font-semibold ml-2">Over 10,000+ happy customers</span>
                </div>
            </header>

            {/* RESULTS GALLERY */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {images.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center max-w-md mx-auto">
                        <p className="text-gray-400 text-sm">
                            {error ? `Could not load testimonials: ${error.message}` : "No photos uploaded yet in the bucket."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {images.map((item, index) => (
                            <div
                                key={item.name || index}
                                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition-all duration-300 shadow-xl"
                            >
                                <div className="relative aspect-[4/5] w-full bg-gray-900 overflow-hidden">
                                    <Image
                                        src={item.url}
                                        alt={`Shapes Lagos Customer Transformation ${index + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading={index < 4 ? 'eager' : 'lazy'}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-xs font-bold text-pink-300">Verified Result ✓</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* BOTTOM CALL TO ACTION */}
                <div className="mt-16 md:mt-24 text-center bg-gradient-to-br from-gray-900 via-gray-900 to-pink-950/40 p-8 sm:p-14 rounded-3xl border border-pink-500/20 max-w-4xl mx-auto shadow-2xl">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                        Ready to Write Your Own Success Story?
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
                        Join thousands of transformations. Get your official Shapes Lagos Kit delivered straight to your door.
                    </p>
                    <Link
                        href="/#shop"
                        className="inline-flex items-center justify-center gap-2 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-pink-500/20 active:scale-95 transition-all"
                    >
                        <span>Start Your Transformation</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </main>
        </div>
    );
}
