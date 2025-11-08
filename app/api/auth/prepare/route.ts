import { ServerEnvKey, ServerEnvUtil } from '@/lib/serverEnv';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createWaiting } from '@/services/auth/waiting';

export async function GET(request: NextRequest) {
  const coreAuthBaseUrl = new URL(ServerEnvUtil.get(ServerEnvKey.CORE_AUTH_BASE_URL));
  const baseUrl = new URL(ServerEnvUtil.get(ServerEnvKey.BASE_URL));

  const nextUrl = request.nextUrl.searchParams.get('redirectTo') || undefined;
  
  const waiting = await createWaiting(nextUrl);

  const redirectUrl = baseUrl;

  redirectUrl.searchParams.set('postAuth', 'true');
  redirectUrl.searchParams.set('state', waiting.id);

  coreAuthBaseUrl.pathname = '/authenticate';
  coreAuthBaseUrl.searchParams.set('redirectUrl', redirectUrl.toString());
  coreAuthBaseUrl.searchParams.set('postbackUrl', baseUrl.pathname = '/api/auth/callback');
  coreAuthBaseUrl.searchParams.set('state', waiting.id);

  return NextResponse.redirect(coreAuthBaseUrl.toString());
}
