"use client";

import React from 'react';
import { Lock, Shapes } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                {/* Logo/Header Area */}
                <div className="flex flex-col items-center justify-center space-y-3 mb-8">
                    <div className="p-3 bg-pink-600 rounded-full shadow-lg">
                        <Shapes className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-2xl rounded-2xl sm:px-10 border border-gray-100/50">
                    {children}
                </div>

                {/* Footer Text */}
                <div className="mt-6 text-center text-sm text-gray-600 flex items-center justify-center space-x-1">
                    <Lock className="h-4 w-4 text-gray-400" />
                    <span>Secure connection & guaranteed privacy.</span>
                </div>
            </div>
        </div>
    );
}