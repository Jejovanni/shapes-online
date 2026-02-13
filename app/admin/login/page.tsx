'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        // Security Check: Ensure the user is actually the admin
        // Replace with your actual admin email
        if (data.user?.email !== 'jamaineekong@gmail.com') {
            await supabase.auth.signOut();
            setErrorMessage("Access denied. Authorized admins only.");
            setLoading(false);
            return;
        }

        router.push('/admin/orders');
        router.refresh();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-[400px] bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl mb-4">
                        <Lock size={24} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Admin Portal</h1>
                    <p className="text-gray-500 text-sm mt-1">Authorized access only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {/* Password Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {errorMessage && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
                            <ShieldAlert size={14} />
                            {errorMessage}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-widest font-bold">
                    Shapes &copy; 2026
                </p>
            </div>
        </div>
    );
}