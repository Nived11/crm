import { NextRequest } from 'next/server';
import { authMiddleware } from './lib/middlewares/authMiddleware';

export function proxy(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/callback|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};