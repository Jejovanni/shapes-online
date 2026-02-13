import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server'; // Move NextRequest here

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: { headers: request.headers },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
                },
            },
        }
    );

    // This refreshes the session if it's expired
    const { data: { user } } = await supabase.auth.getUser();

    // Protection Logic
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPage = request.nextUrl.pathname.includes('/login');

    if (isAdminPath && !user && !isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*'],
};