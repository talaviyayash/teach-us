import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/signin', '/forgot-password', '/signup']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value
  const isPublic = PUBLIC_ROUTES.includes(pathname)

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|api|.*\\..*).*)']
}
