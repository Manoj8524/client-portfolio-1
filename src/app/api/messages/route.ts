import { NextRequest, NextResponse } from 'next/server';
import {
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
} from '@/lib/contentStore';

const AUTH_COOKIE_NAME = 'muthu_admin_session';
const SESSION_TOKEN = 'muthu_secure_admin_token_2026';

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get(AUTH_COOKIE_NAME);
  return cookie?.value === SESSION_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const messages = getContactMessages();
  return NextResponse.json({ ok: true, data: messages });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !['unread', 'read', 'archived'].includes(status)) {
      return NextResponse.json({ ok: false, error: 'Invalid parameters' }, { status: 400 });
    }

    const success = updateContactMessageStatus(id, status);
    return NextResponse.json({ ok: success });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Message ID is required' }, { status: 400 });
    }

    const success = deleteContactMessage(id);
    return NextResponse.json({ ok: success });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
