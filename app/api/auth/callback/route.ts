import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// catch post from coreAuth

export async function POST(request: NextRequest) {
  const url = request.nextUrl.clone();
  const body = await request.json();
  const token = body.token;
  console.log('Received token from coreAuth:', token);
}
