import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setToken, WaitingEntryExpiredError, WaitingEntryNotFoundError } from '@/services/auth/waiting';
import { decodeToken } from '@/services/auth/token';
import { TokenClaims } from '@/types/schema/tokenClaims';
import { createUser, isUserExists } from '@/services/user';
import { makeErrorPageUrlHelper } from '@/lib/makeErrorPageUrlHelper';

// catch post from coreAuth

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = body.token;
  const state = body.state;
  let claims: TokenClaims | null = null;
  console.log('Received token from coreAuth:', token);

  if (!token || !state) {
    return NextResponse.json({ status: 'error', message: 'Missing token or state' }, { status: 400 });
  }

  claims = await decodeToken(token).catch((error) => {
    console.error('Error decoding token:', error);
    return null;
  });

  if (!claims || !claims.uid) {
    return NextResponse.json({ status: 'error', message: 'Invalid token' }, { status: 400 });
  }

  await setToken(state, token).catch((error) => {
    if (error instanceof WaitingEntryNotFoundError) {
      return NextResponse.json({ status: 'error', message: 'Waiting entry not found' }, { status: 404 });
    } else if (error instanceof WaitingEntryExpiredError) {
      return NextResponse.json({ status: 'error', message: 'Waiting entry has expired' }, { status: 410 });
    } else {
      return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
    }
  });

  if (!await isUserExists(claims.uid)) {
    const createdUser = createUser({
      id: claims.uid,
      displayName: "TODO",
      generated: true,
    }).catch((error) => {
      console.error('Error creating user:', error);
      return NextResponse.json({ status: 'error', message: 'Failed to create user' }, { status: 500 });
    });
  }



  // coreAuthには200を返す
  return NextResponse.json({ status: 'ok' });
}
