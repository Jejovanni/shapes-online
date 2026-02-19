import React, { ReactNode } from 'react';

interface IconProps {
    children: ReactNode;
    className?: string;
}

export default function IconPlaceholder({ children, className = "" }: IconProps) {
    return (
        <div className={`p-4 rounded-full bg-pink-500/20 text-pink-400 ${className}`}>
            {children}
        </div>
    );
}