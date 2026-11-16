import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteContentAsync, updateSiteContent } from '@/lib/contentStore';

const AUTH_COOKIE_NAME = 'muthu_admin_session';
const SESSION_TOKEN = 'muthu_secure_admin_token_2026';

export async function GET() {
  const content = await getSiteContentAsync();
  return NextResponse.json(content, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  // Check admin session
  const cookie = req.cookies.get(AUTH_COOKIE_NAME);
  if (cookie?.value !== SESSION_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const newContent = await req.json();
    const result = await updateSiteContent(newContent);

    if (result.ok) {
      // Revalidate all pages so the public site reflects edits instantly
      try {
        revalidatePath('/');
        revalidatePath('/works');
        revalidatePath('/about');
        revalidatePath('/contact');
      } catch (revErr) {
        console.warn('Revalidation warning:', revErr);
      }

      return NextResponse.json({ ok: true, message: 'Content updated successfully' });
    } else {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
