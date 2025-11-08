import { jwtVerify, createRemoteJWKSet } from 'jose';
import { ServerEnvKey, ServerEnvUtil } from '@/lib/serverEnv';

async function verifyToken(token: string): Promise<any> {
  const coreAuthBaseUrl = new URL(ServerEnvUtil.get(ServerEnvKey.CORE_AUTH_BASE_URL));
  const jwksUrl = new URL('/.well-known/jwks.json', coreAuthBaseUrl);
  const JWKS = createRemoteJWKSet(jwksUrl);
  try {
    const { payload } = await jwtVerify(token, JWKS);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export { verifyToken };
