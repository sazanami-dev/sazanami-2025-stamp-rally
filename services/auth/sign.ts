import jwks from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import authApi from './api';


async function getSigningKey(kid: string): Promise<string> {

  const jwksResponse = await authApi().get({ path: '/.well-known/jwks.json' });

  const jwk = jwksResponse.keys.find((key: any) => key.kid === kid);

  if (!jwk) {
    throw new Error(`Signing key not found for kid: ${kid}`);
  }

  return jwks(jwk);
}

async function verifyToken(token: string): Promise<any> {
  const decodedHeader = jwt.decode(token, { complete: true });
  if (!decodedHeader || typeof decodedHeader === 'string') {
    throw new Error('Invalid token');
  }
  const kid = decodedHeader.header.kid;
  if (!kid) throw new Error('Token header does not contain kid');
  const publicKey = await getSigningKey(kid);
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}

export { verifyToken };
