"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Save } from 'lucide-react';

// --- Mock Data Type (In a real app, this would be imported from types/) ---
interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
}

// --- Mock Initial State ---
const INITIAL_PROFILE: UserProfile = {
    firstName: 'Jona',
    lastName: 'Designer',
    email: 'jona.designer@example.com',
    phone: '+1 (555) 123-4567',
    addressLine1: '123 Vector Street',
    addressLine2: 'Apt 4B',
    city: 'Graphville',
    state: 'CA',
    zipCode: '90210',
};

// --- Main Profile Settings Page ---

export default function ProfileSettingsPage() {
    const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSubmitProfile = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for API call to save profile
        console.log('Saving profile:', profile);
        alert('Profile updated successfully! (Mock)');
    };

    const handleSubmitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            alert('New password and confirmation do not match.');
            return;
        }
        // Placeholder for API call to change password
        console.log('Changing password with new value:', password.new);
        setPassword({ current: '', new: '', confirm: '' });
        alert('Password updated successfully! (Mock)');
    };

    // Input Field Helper
    const InputField: React.FC<{
        id: string;
        name: keyof UserProfile | keyof typeof password;
        label: string;
        type?: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        icon: React.ElementType;
        isProfile?: boolean;
    }> = ({ id, name, label, type = 'text', value, onChange, icon: Icon, isProfile = true }) => (
        <div className="relative">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type={type}
                    name={name as string}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="block w-full rounded-xl border-gray-300 pl-10 pr-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 transition sm:text-sm border"
                />
            </div>
        </div>
    );


    return (
        <div className="space-y-12">

            {/* Header */}
            <div className="flex items-center space-x-3 border-b pb-4">
                <User className="h-7 w-7 text-pink-600" />
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            </div>

            {/* 1. Personal Information */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-pink-600" />
                    Personal Information
                </h2>
                <form onSubmit={handleSubmitProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={profile.firstName}
                            onChange={handleProfileChange}
                            icon={User}
                        />
                        <InputField
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={profile.lastName}
                            onChange={handleProfileChange}
                            icon={User}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            icon={Mail}
                        />
                        <InputField
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            type="tel"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            icon={Phone}
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-pink-600 text-white font-semibold rounded-xl shadow-md hover:bg-pink-700 transition duration-150"
                    >
                        <Save className="h-5 w-5" />
                        Save Personal Info
                    </button>
                </form>
            </section>

            {/* 2. Shipping Address */}
            <section className="pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-pink-600" />
                    Shipping Address
                </h2>
                <form onSubmit={handleSubmitProfile} className="space-y-6">
                    <InputField
                        id="addressLine1"
                        name="addressLine1"
                        label="Address Line 1"
                        value={profile.addressLine1}
                        onChange={handleProfileChange}
                        icon={MapPin}
                    />
                    <InputField
                        id="addressLine2"
                        name="addressLine2"
                        label="Address Line 2 (Optional)"
                        value={profile.addressLine2}
                        onChange={handleProfileChange}
                        icon={MapPin}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputField
                            id="city"
                            name="city"
                            label="City"
                            value={profile.city}
                            onChange={handleProfileChange}
                            icon={MapPin}
                        />
                        <InputField
                            id="state"
                            name="state"
                            label="State / Province"
                            value={profile.state}
                            onChange={handleProfileChange}
                            icon={MapPin}
                        />
                        <InputField
                            id="zipCode"
                            name="zipCode"
                            label="ZIP / Postal Code"
                            value={profile.zipCode}
                            onChange={handleProfileChange}
                            icon={MapPin}
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-pink-600 text-white font-semibold rounded-xl shadow-md hover:bg-pink-700 transition duration-150"
                    >
                        <Save className="h-5 w-5" />
                        Save Address
                    </button>
                </form>
            </section>

            {/* 3. Change Password */}
            <section className="pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-pink-600" />
                    Change Password
                </h2>
                <form onSubmit={handleSubmitPassword} className="space-y-6 max-w-lg">
                    <InputField
                        id="currentPassword"
                        name="current"
                        label="Current Password"
                        type="password"
                        value={password.current}
                        onChange={handlePasswordChange}
                        icon={Lock}
                        isProfile={false}
                    />
                    <InputField
                        id="newPassword"
                        name="new"
                        label="New Password"
                        type="password"
                        value={password.new}
                        onChange={handlePasswordChange}
                        icon={Lock}
                        isProfile={false}
                    />
                    <InputField
                        id="confirmPassword"
                        name="confirm"
                        label="Confirm New Password"
                        type="password"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        icon={Lock}
                        isProfile={false}
                    />

                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-pink-600 text-white font-semibold rounded-xl shadow-md hover:bg-pink-700 transition duration-150"
                    >
                        <Save className="h-5 w-5" />
                        Change Password
                    </button>
                </form>
            </section>

        </div>
    );
}