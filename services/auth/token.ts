import jwt from 'jsonwebtoken';
import { TokenClaims, TokenClaimsSchema } from '@/types/schema/tokenClaims';

async function decodeToken(token: string): Promise<TokenClaims> {
  let claims: TokenClaims;
  return new Promise((resolve, reject) => {
    jwt.verify(token, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      try {
        claims = TokenClaimsSchema.parse(decoded);
      } catch (e) {
        return reject(e);
      }
      resolve(claims);
    });
  });
}

export { decodeToken };
