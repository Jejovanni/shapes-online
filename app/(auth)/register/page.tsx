"use client";

import React, { useState } from 'react';
import { Mail, Lock, UserPlus } from 'lucide-react';

/**
 * Reusable Auth Button Component
 * Consolidated into this file to resolve import issues.
 */
const AuthButton = ({ 
  loading, 
  text, 
  icon, 
  onClick, 
  type = "submit" 
}) => {
  return (
    <div className="w-full">
      <button
        type={type}
        disabled={loading}
        onClick={onClick}
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 disabled:bg-pink-400 disabled:cursor-not-allowed min-h-[40px]"
      >
        {loading ? (
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <span className='flex items-center gap-2'>
            {icon}
            {text}
          </span>
        )}
      </button>
    </div>
  );
};

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setLoading(false);
            console.warn('Registration failed: Passwords do not match.');
            return;
        }

        // --- Placeholder for Registration Logic ---
        console.log('Attempting registration with:', { email, password });

        setTimeout(() => {
            setLoading(false);
            if (email && password.length >= 6) {
                console.log('Registration successful! Redirecting...');
            } else {
                console.error('Registration failed: Please check your input.');
            }
        }, 1500);
        // --- End Placeholder ---
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
                            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition"
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
                            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition"
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters.</p>
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition"
                        />
                    </div>
                </div>

                {/* Refactored Submit Button using local AuthButton component */}
                <AuthButton 
                    loading={loading}
                    text="Register Account"
                    icon={<UserPlus className="h-5 w-5" />}
                />
            </form>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-pink-600 hover:text-pink-500 transition">
                    Sign in here
                </a>
            </div>
        </div>
    );
}