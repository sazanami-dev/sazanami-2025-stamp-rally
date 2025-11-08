import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setToken, WaitingEntryExpiredError, WaitingEntryNotFoundError } from '@/services/auth/waiting';
import { verifyToken } from '@/services/auth/sign';

// catch post from coreAuth

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = body.token;
  const state = body.state;
  console.log('Received token from coreAuth:', token);

  if (!token || !state) {
    return NextResponse.json({ status: 'error', message: 'Missing token or state' }, { status: 400 });
  }

  if (!(await verifyToken(token))) {
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

  // coreAuthには200を返す
  return NextResponse.json({ status: 'ok' });
}
