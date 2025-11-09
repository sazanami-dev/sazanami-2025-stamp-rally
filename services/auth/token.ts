import jwt from 'jsonwebtoken';
import { TokenClaims, TokenClaimsSchema } from '@/types/schema/tokenClaims';
import { ServerEnvKey, ServerEnvUtil } from '@/lib/serverEnv';
import { createRemoteJWKSet, jwtVerify } from 'jose';

async function decodeToken(token: string): Promise<TokenClaims> {
  const coreAuthBaseUrl = new URL(ServerEnvUtil.get(ServerEnvKey.CORE_AUTH_BASE_URL));
  const jwksUrl = new URL('/.well-known/jwks.json', coreAuthBaseUrl);
  const JWKS = createRemoteJWKSet(jwksUrl);
  try {
    const { payload } = await jwtVerify(token, JWKS);
    return TokenClaimsSchema.parse(payload);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export { decodeToken };
