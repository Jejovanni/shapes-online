"use client";

import React from 'react';
import { FileText, Users, HeartHandshake, Shield, Gavel } from 'lucide-react';

export default function TermsOfServicePage() {
    const lastUpdated = "October 24, 2025";

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-2xl border border-pink-100">

                <header className="text-center mb-10 border-b border-pink-200/50 pb-6">
                    <FileText className="h-10 w-10 mx-auto text-pink-600 mb-3" />
                    <h1 className="text-4xl font-extrabold text-gray-900">Terms of Service</h1>
                    <p className="text-lg text-gray-500 mt-2">
                        These terms govern your use of the Shapes Shop website and services.
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Last Updated: {lastUpdated}</p>
                </header>

                <section className="space-y-10 text-gray-700">

                    {/* Section 1: Acceptance of Terms */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <HeartHandshake className="h-6 w-6 text-pink-600" />
                            1. Agreement to Terms
                        </h2>
                        <p>
                            By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service. These Terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </div>

                    {/* Section 2: User Accounts */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Users className="h-6 w-6 text-pink-600" />
                            2. User Responsibilities
                        </h2>
                        <p className="mb-4">
                            When you create an account with us, you must provide information that is accurate, complete, and current. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                        <ul className="space-y-2 list-none pl-0 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p>You agree not to use the Service for any unlawful purpose or any purpose prohibited by this agreement.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Section 3: Intellectual Property */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Shield className="h-6 w-6 text-pink-600" />
                            3. Intellectual Property Rights
                        </h2>
                        <p>
                            The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Shapes Shop and its licensors. Our vector packs and designs are protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </p>
                        <p className="mt-4">
                            Upon purchase, you are granted a non-exclusive, non-transferable, revocable license to use the digital products strictly in accordance with our separate licensing agreement (available upon request).
                        </p>
                    </div>

                    {/* Section 4: Limitation of Liability */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Gavel className="h-6 w-6 text-pink-600" />
                            4. Limitation of Liability
                        </h2>
                        <p>
                            In no event shall Shapes Shop, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                        </p>
                        <ol className="list-disc list-inside pl-4 text-sm mt-3 space-y-1">
                            <li>Your access to or use of or inability to access or use the Service;</li>
                            <li>Any unauthorized access to or use of our servers and/or any and all personal information stored therein;</li>
                            <li>Any conduct or content of any third party on the Service.</li>
                        </ol>
                    </div>

                </section>

                <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>For any questions regarding these Terms, please contact us at legal@shapesshop.com.</p>
                </footer>

            </div>
        </div>
    );
}