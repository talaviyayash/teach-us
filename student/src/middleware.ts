import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/signin', '/forgot-password', '/signup']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  if (!isPublic && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if ((accessToken || refreshToken) && isPublic) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|api|.*\\..*).*)']
}
