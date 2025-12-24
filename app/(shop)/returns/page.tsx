"use client";

import React from 'react';
import { RefreshCw, Mail, Calendar, DollarSign, Package } from 'lucide-react';

export default function ReturnsPolicyPage() {
    return (
        <div className="min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-2xl border border-pink-100">

                <header className="text-center mb-10 border-b border-pink-200/50 pb-6">
                    <RefreshCw className="h-10 w-10 mx-auto text-pink-600 mb-3" />
                    <h1 className="text-4xl font-extrabold text-gray-900">Returns & Refund Policy</h1>
                    <p className="text-lg text-gray-500 mt-2">Your satisfaction is our priority. Here's how we handle returns.</p>
                </header>

                <section className="space-y-8 text-gray-700">

                    {/* Section 1: Eligibility */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Calendar className="h-6 w-6 text-pink-600" />
                            1. Eligibility Window
                        </h2>
                        <p className="mb-4">
                            We accept returns within <strong className="text-pink-600">30 days</strong> of the purchase date. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.
                        </p>
                        <ul className="space-y-2 list-none pl-0 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p>Digital products (vector packs, downloads) are non-refundable once the file has been accessed or downloaded, except in cases of technical fault.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p>Custom or personalized orders cannot be returned or exchanged.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Section 2: How to Initiate a Return */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Mail className="h-6 w-6 text-pink-600" />
                            2. How to Process Your Return
                        </h2>
                        <p className="mb-4">
                            To complete your return, please follow these steps:
                        </p>
                        <ol className="space-y-3 list-decimal list-inside pl-4">
                            <li>
                                <strong className="font-semibold text-gray-900">Contact Us:</strong> Email us at <a href="mailto:support@shapesshop.com" className="text-pink-600 hover:underline">support@shapesshop.com</a> with your Order Number and the reason for the return.
                            </li>
                            <li>
                                <strong className="font-semibold text-gray-900">Receive Authorization:</strong> We will review your request and send you a Return Authorization (RA) number and return shipping instructions.
                            </li>
                            <li>
                                <strong className="font-semibold text-gray-900">Ship the Item:</strong> Carefully package the item, include the RA number inside, and ship it to the address provided in the instructions. You will be responsible for paying your own shipping costs for returning your item.
                            </li>
                        </ol>
                    </div>

                    {/* Section 3: Refunds */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <DollarSign className="h-6 w-6 text-pink-600" />
                            3. Refunds Process
                        </h2>
                        <p className="mb-4">
                            Once your return is received and inspected, we will send you an email notification of the approval or rejection of your refund.
                        </p>
                        <ul className="space-y-2 list-none pl-0 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p><strong className="font-semibold text-gray-900">Approved Refunds:</strong> If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment, typically within 7-10 business days.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p><strong className="font-semibold text-gray-900">Late or Missing Refunds:</strong> If you haven't received a refund yet, first check your bank account. Then contact your credit card company. If you've done all of this and still have not received your refund, please contact us.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Section 4: Exchanges */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Package className="h-6 w-6 text-pink-600" />
                            4. Exchanges
                        </h2>
                        <p>
                            We only replace items if they are defective or damaged upon arrival. If you need to exchange it for the same item, send us an email and we will provide instructions.
                        </p>
                    </div>

                </section>

                <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>This policy is subject to change without prior notice. Please check this page regularly for updates.</p>
                </footer>

            </div>
        </div>
    );
}