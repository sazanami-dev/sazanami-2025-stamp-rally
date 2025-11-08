import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './services/auth/sign'
import { ServerEnvKey, ServerEnvUtil } from './lib/serverEnv'

export async function middleware(request: NextRequest) {

  // Bypass auth (for debug use only)
  if (request.nextUrl.searchParams.get('bypassAuth') === 'true') {
    return NextResponse.next()
  }

  // Bypass static files and API routes
  if (request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Cookieのトークンをチェック
  const token = request.cookies.get('token')?.value

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
    // Redirect to coreAuth if token is invalid or missing
    const url = request.nextUrl.clone()
    const coreAuthBaseUrl = new URL(ServerEnvUtil.get(ServerEnvKey.CORE_AUTH_BASE_URL));

    coreAuthBaseUrl.pathname = '/authenticate';
    coreAuthBaseUrl.searchParams.set('redirectUrl', url.toString());
    coreAuthBaseUrl.searchParams.set('postbackUrl', url.origin + '/api/auth/callback');
    return NextResponse.redirect(coreAuthBaseUrl);
  }
}
