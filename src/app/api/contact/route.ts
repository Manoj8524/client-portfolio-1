import { NextRequest, NextResponse } from 'next/server';
import { addContactMessage } from '@/lib/contentStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, email_address, phone_number, message } = body;

    // Validation
    if (!full_name || full_name.trim().length < 2) {
      return NextResponse.json({ ok: false, error: 'Full name is required (min 2 characters)' }, { status: 400 });
    }
    if (!email_address || !email_address.includes('@')) {
      return NextResponse.json({ ok: false, error: 'A valid email address is required' }, { status: 400 });
    }
    if (!message || message.trim().length < 5) {
      return NextResponse.json({ ok: false, error: 'Message must be at least 5 characters' }, { status: 400 });
    }

    // Save lead to inquiries database
    const saved = addContactMessage({
      full_name,
      email_address,
      phone_number: phone_number || '',
      message,
    });

    // Optional email dispatch via Resend if API key is provided
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Muthu Studio <leads@muthu.design>',
            to: [process.env.ADMIN_NOTIFY_EMAIL || 'info@muthu.design'],
            subject: `🌟 New Portfolio Lead from ${full_name}`,
            html: `
              <h2>New Contact Submission Received</h2>
              <p><strong>Name:</strong> ${full_name}</p>
              <p><strong>Email:</strong> ${email_address}</p>
              <p><strong>Phone:</strong> ${phone_number || 'N/A'}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #fec52d">${message}</blockquote>
              <p><small>Received at: ${saved.created_at}</small></p>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn('Resend email delivery skipped or failed:', emailErr);
      }
    }

    return NextResponse.json({
      ok: true,
      message: 'Enquiry submitted successfully',
      id: saved.id,
    });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
