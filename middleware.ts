import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './services/auth/sign'
import { ServerEnvKey, ServerEnvUtil } from './lib/serverEnv'

export async function middleware(request: NextRequest) {

  const baseUrl = new URL(ServerEnvUtil.get(ServerEnvKey.BASE_URL))

  // Bypass auth (for debug use only)
  if (request.nextUrl.searchParams.get('bypassAuth') === 'true') {
    return NextResponse.next()
  }

  // Bypass static files and API routes
  if (request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  if (request.nextUrl.searchParams.get('postAuth') === 'true') {
    const postProcessUrl = new URL(baseUrl.toString())
    postProcessUrl.pathname = '/api/auth/post'
    return NextResponse.rewrite(postProcessUrl.toString())
  }

  // Cookieのトークンをチェック
  const token = request.cookies.get('token')?.value

  console.log(`Checking token: ${token}`)

  let isValidToken = false

  if (token) {
    try {
      // トークンの検証
      isValidToken = await verifyToken(token)
    } catch (error) {
      isValidToken = false
    }
  }

  if (!isValidToken) {
    console.log('Invalid or missing token, redirecting to auth prepare')
    // return NextResponse.rewrite(baseUrl.pathname = '/api/auth/prepare') // こっちのほうがUXはいいっぽいけど
    baseUrl.pathname = '/api/auth/prepare'
    baseUrl.searchParams.set('redirectTo', request.nextUrl.toString())
    return NextResponse.redirect(baseUrl.toString())
  }
  return NextResponse.next()
}
