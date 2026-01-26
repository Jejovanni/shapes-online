// Using standard anchor tags (<a>) instead of next/link to resolve environment-specific compilation errors
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu } from 'lucide-react';

// Define the navigation links for the marketing area
const marketingLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-black text-pink-400 shadow-lg shadow-pink-900/50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
               
                <Link href="/" className="inline-flex items-center hover:opacity-80 transition duration-300">
                    <Image
                        src="/Shapes_logo.png"  // Path relative to /public (replace with your actual filename)
                        alt="Shapes Online Logo"
                        width={200}      // Adjust to your logo's desired display width (in pixels)
                        height={50}      // Adjust to maintain aspect ratio (use your logo's natural ratio)
                        priority         // Optional: Loads faster since it's above-the-fold (navbar logo)
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {marketingLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-lg font-medium hover:text-pink-100 transition duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Actions & CTA */}
                <div className="flex items-center space-x-4">
                    <a href="/products" className="hidden sm:block px-4 py-1.5 bg-pink-600 text-black font-semibold rounded-full hover:bg-pink-400 transition duration-300 text-sm">
                        Shop Now
                    </a>

                    <a href="/cart" aria-label="Shopping Cart" className="p-2 hover:bg-pink-900 rounded-full transition duration-300">
                        <ShoppingCart className="h-6 w-6" />
                    </a>

                    <a href="/login" aria-label="User Account" className="p-2 hover:bg-pink-900 rounded-full transition duration-300">
                        <User className="h-6 w-6" />
                    </a>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 hover:bg-pink-900 rounded-full transition duration-300" aria-label="Open menu">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};