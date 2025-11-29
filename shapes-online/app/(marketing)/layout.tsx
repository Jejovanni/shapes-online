// Changing absolute imports (e.g., '@/components/layout/Header') to relative imports
// to resolve the "Could not resolve" error in the environment.

import { Header } from '@/components/layout/Header';
// import { Header } from '../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import React from 'react';

/**
 * Layout for all public-facing marketing routes: /, /about, /contact
 * This layout provides the marketing-specific Header and Footer.
 * * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The nested page content.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    // Ensure the component returns JSX and is a default export
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* 1. Marketing Header (Sticky and Styled Black/Pink) */}
            <Header />

            {/* 2. Main Content Area */}
            <main className="grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            {/* 3. Marketing Footer (Black/Pink) */}
            <Footer />
        </div>
    );
}