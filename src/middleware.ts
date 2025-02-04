import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/api/:path*',
  ]
}

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const token = await getToken({ req: request })
    const isAuthenticated = !!token
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/signIn', request.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)