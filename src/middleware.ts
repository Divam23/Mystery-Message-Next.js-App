import { NextResponse, NextRequest } from 'next/server'
// import type { NextRequest } from 'next/server'
import {getToken} from 'next-auth/jwt'

// export {default} from 'next-auth/middleware'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req: request})
    const url = request.nextUrl;

    if (token) {
    if (
      url.pathname === "/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname === "/verify"
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // allow logged-in users to visit other pages including /dashboard
  } else {
    if (url.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ],
}