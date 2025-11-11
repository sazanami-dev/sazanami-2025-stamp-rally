import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeToken } from './services/auth/token'
import { ServerEnvKey, ServerEnvUtil } from './lib/serverEnv'

export async function middleware(request: NextRequest) {
  const baseUrl = new URL(ServerEnvUtil.get(ServerEnvKey.BASE_URL))

  // Bypass auth (for debug use only)
  if (request.nextUrl.searchParams.get('bypassAuth') === 'true') {
    return NextResponse.next()
  }

  if (request.nextUrl.searchParams.get('postAuth') === 'true') {
    const postProcessUrl = new URL(baseUrl.toString())
    const nextUrl = new URL(baseUrl.toString())
    nextUrl.pathname = request.nextUrl.pathname
    postProcessUrl.pathname = '/api/auth/post'
    postProcessUrl.searchParams.set('state', request.nextUrl.searchParams.get('state') || '')
    postProcessUrl.searchParams.set('postAuth', 'true')
    postProcessUrl.searchParams.set('redirectTo', nextUrl.toString())
    return NextResponse.rewrite(postProcessUrl.toString())
  }

  // Cookieのトークンをチェック
  const token = request.cookies.get('token')?.value

  let isValidToken = false

  if (token) {
    try {
      // トークンの検証
      const claims = await decodeToken(token)
      if (claims) {
        isValidToken = true
      }
    } catch (error) {
      isValidToken = false
    }
  }

  if (!isValidToken) {
    // return NextResponse.rewrite(baseUrl.pathname = '/api/auth/prepare') // こっちのほうがUXはいいっぽいけど
    const nextUrl = new URL(baseUrl.toString())
    nextUrl.pathname = request.nextUrl.pathname
    baseUrl.pathname = '/api/auth/prepare'
    baseUrl.searchParams.set('redirectTo', nextUrl.toString())
    return NextResponse.redirect(baseUrl.toString())
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // '/api/auth/prepare',
    // '/api/auth/post',
    '/checkin/:path*',
    '/',
  ]
}
