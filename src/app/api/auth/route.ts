import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'muthu2026';
const AUTH_COOKIE_NAME = 'muthu_admin_session';
const SESSION_TOKEN = 'muthu_secure_admin_token_2026';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(AUTH_COOKIE_NAME);
  const isAuthenticated = cookie?.value === SESSION_TOKEN;
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ ok: true, message: 'Authenticated successfully' });
      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: SESSION_TOKEN,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true, message: 'Logged out' });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}
