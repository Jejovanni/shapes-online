import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'outline' | 'emerald' | 'outlineGray';
    className?: string;
}

export default function Button({
    children,
    size = 'lg',
    variant = 'default',
    className = "",
    ...props
}: ButtonProps) {
    const baseStyle = "inline-flex items-center justify-center rounded-xl transition-colors duration-300 font-bold whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const sizeClasses = {
        sm: "text-sm px-4 py-2 h-auto",
        md: "text-base px-6 py-3 h-auto",
        lg: "text-lg sm:text-lg px-8 py-3 sm:py-4 h-auto",
        xl: "text-lg sm:text-xl px-10 py-4 sm:py-5 h-auto",
    };

    const variantClasses = {
        default: "bg-pink-500 text-white hover:bg-pink-600",
        outline: "bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white",
        emerald: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20",
        outlineGray: "bg-transparent border-2 border-gray-700 text-gray-300 hover:border-pink-500 hover:text-white",
    };

    return (
        <button
            className={`${baseStyle} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}