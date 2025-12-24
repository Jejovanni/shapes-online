"use client";

import React from 'react';
import { Truck, Clock, MapPin, DollarSign, Globe } from 'lucide-react';

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-2xl border border-pink-100">

                <header className="text-center mb-10 border-b border-pink-200/50 pb-6">
                    <Truck className="h-10 w-10 mx-auto text-pink-600 mb-3" />
                    <h1 className="text-4xl font-extrabold text-gray-900">Shipping & Delivery</h1>
                    <p className="text-lg text-gray-500 mt-2">Information on our processing times, shipping methods, and costs.</p>
                </header>

                <section className="space-y-8 text-gray-700">

                    {/* Section 1: Order Processing Time */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Clock className="h-6 w-6 text-pink-600" />
                            1. Order Processing
                        </h2>
                        <p className="mb-4">
                            All orders are processed within <strong className="text-pink-600">1 to 3 business days</strong> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
                        </p>
                        <ul className="space-y-2 list-none pl-0 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p>Digital products (vector packs) are available for instant download immediately after purchase and are not subject to shipping times.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p>Processing times may be delayed during high-volume periods or holidays.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Section 2: Domestic Shipping Methods & Delivery Estimates */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin className="h-6 w-6 text-pink-600" />
                            2. Domestic Shipping
                        </h2>
                        <p className="mb-4">
                            We offer the following shipping options within the United States:
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left table-auto border-collapse">
                                <thead>
                                    <tr className="bg-pink-100/50 border-b border-pink-200">
                                        <th className="py-2 px-4 font-semibold text-gray-800">Method</th>
                                        <th className="py-2 px-4 font-semibold text-gray-800">Estimated Delivery</th>
                                        <th className="py-2 px-4 font-semibold text-gray-800">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-3 px-4">Standard Shipping</td>
                                        <td className="py-3 px-4">5-8 Business Days</td>
                                        <td className="py-3 px-4 text-pink-600 font-medium">$5.00</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-3 px-4">Express Shipping</td>
                                        <td className="py-3 px-4">1-3 Business Days</td>
                                        <td className="py-3 px-4 text-pink-600 font-medium">$15.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section 3: International Shipping */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Globe className="h-6 w-6 text-pink-600" />
                            3. International Shipping
                        </h2>
                        <p className="mb-4">
                            We offer international shipping to most countries. Shipping costs are calculated at checkout based on the destination and package weight.
                        </p>
                        <ul className="space-y-2 list-none pl-0 text-sm bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p><strong className="font-semibold text-gray-900">Customs, Duties, and Taxes:</strong> Shapes Shop is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold flex-shrink-0">•</span>
                                <p><strong className="font-semibold text-gray-900">Delivery Time:</strong> International delivery typically takes 7–21 business days but can be delayed due to customs processing.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Section 4: Tracking Your Order */}
                    <div className="border-l-4 border-pink-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <DollarSign className="h-6 w-6 text-pink-600" />
                            4. Tracking Your Order
                        </h2>
                        <p>
                            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
                        </p>
                    </div>

                </section>

                <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>If you have any further questions, please contact us at support@shapesshop.com.</p>
                </footer>

            </div>
        </div>
    );
}