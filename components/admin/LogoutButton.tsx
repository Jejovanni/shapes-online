'use client';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh(); // Clears the server-side cache
    };

    return (
        <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-red-600 transition-colors bg-white rounded-xl border border-gray-100 shadow-sm"
        >
            <LogOut size={16} />
            Logout
        </button>
    );
}