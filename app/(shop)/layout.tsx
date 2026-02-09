import {Header} from "@/components/layout/Header"; // Adjust the path to where your Header file is
import {Footer} from "@/components/layout/Footer";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* This ensures the header is present on every shop sub-page */}
            <Header />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}