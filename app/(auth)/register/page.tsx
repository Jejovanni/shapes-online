"use client";

import React, { useState, FormEvent } from 'react';
import { Mail, Lock, UserPlus } from 'lucide-react';
import { AuthButton } from '@/components/ui/AuthButton';

export default function RegisterPage() {
    // 1. Re-add the missing state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. Add the typed submit handler
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setLoading(false);
            alert('Passwords do not match.');
            return;
        }

        // --- Logic Placeholder ---
        console.log('Registering:', { email, password });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        // -------------------------
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition"
                        />
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="confirm-password"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition"
                        />
                    </div>
                </div>

                <AuthButton 
                    loading={loading}
                    text="Register Account"
                    icon={<UserPlus className="h-5 w-5" />}
                />
            </form>

            <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-pink-600 hover:text-pink-500 transition">
                    Sign in here
                </a>
            </div>
        </div>
    );
}