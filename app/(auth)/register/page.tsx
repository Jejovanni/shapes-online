"use client";

import React, { useState } from 'react';
import { Mail, Lock, UserPlus } from 'lucide-react';
import { AuthButton } from '@/components/ui/AuthButton'; // Import the new shared component

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    // ... rest of your state and handleSubmit logic

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... your input fields */}
                
                <AuthButton 
                    loading={loading}
                    text="Register Account"
                    icon={<UserPlus className="h-5 w-5" />}
                />
            </form>
        </div>
    );
}