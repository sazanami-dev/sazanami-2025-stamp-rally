import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeToken } from './services/auth/token'
import { ServerEnvKey, ServerEnvUtil } from './lib/serverEnv'

const DEBUG_BYPASS_ENABLED = false

export async function middleware(request: NextRequest) {
  const baseUrlString = ServerEnvUtil.get(ServerEnvKey.BASE_URL)
  const typoPath = "/cehckin"
  if (request.nextUrl.pathname.startsWith(typoPath)) {
    const correctedUrl = new URL(request.nextUrl.toString())
    correctedUrl.pathname = request.nextUrl.pathname.replace(typoPath, "/checkin")
    return NextResponse.redirect(correctedUrl)
  }

  if (DEBUG_BYPASS_ENABLED && request.nextUrl.searchParams.get('bypassAuth') === 'true') {
    return NextResponse.next()
  }

  if (request.nextUrl.searchParams.get('postAuth') === 'true') {
    const postProcessUrl = new URL(baseUrlString)
    const nextUrl = new URL(request.nextUrl.toString())
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
    const prepareUrl = new URL(baseUrlString)
    prepareUrl.pathname = '/api/auth/prepare'
    const nextUrl = new URL(request.nextUrl.toString())
    prepareUrl.searchParams.set('redirectTo', nextUrl.toString())
    return NextResponse.redirect(prepareUrl.toString())
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
