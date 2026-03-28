import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function authMiddleware(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  // 1. Admin Protection
  if (pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 🛑 Loop Fix: Admin email mismatch aanengil sign-out trigger cheyyaan error viduka
    if (user.email !== ADMIN_EMAIL) {
      const url = new URL('/login', request.url);
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }
  }

  // 2. Login Page Protection
  if (pathname === '/login' && user) {
    // Admin user aanengil dashboard-lekk viduka
    if (user.email === ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Admin allatha user login-il vannal avide thanne nilkkan allow cheyyuka (Error message kaanikkan)
  }

  return response;
}