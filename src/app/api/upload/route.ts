import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabaseAdmin } from '@/lib/supabase';

const AUTH_COOKIE_NAME = 'muthu_admin_session';
const SESSION_TOKEN = 'muthu_secure_admin_token_2026';

export async function POST(req: NextRequest) {
  // Verify admin authentication
  const cookie = req.cookies.get(AUTH_COOKIE_NAME);
  if (cookie?.value !== SESSION_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '_')
      .replace(/_+/g, '_');
    const filename = `${Date.now()}_${safeName}`;

    // 1. Primary: Upload to Supabase Storage bucket 'portfolio-media'
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { error: uploadError } = await supabaseAdmin.storage
          .from('portfolio-media')
          .upload(filename, buffer, {
            contentType: file.type || 'image/webp',
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from('portfolio-media')
            .getPublicUrl(filename);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({
              ok: true,
              url: publicUrlData.publicUrl,
              cdn: 'supabase',
            });
          }
        } else {
          console.warn('Supabase upload warning:', uploadError.message);
        }
      } catch (sbErr) {
        console.warn('Supabase upload attempt failed, trying fallback:', sbErr);
      }
    }

    // 2. Fallback: Cloudinary (if configured)
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

      const uploadData = new FormData();
      uploadData.append('file', base64Data);
      uploadData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset');
      uploadData.append('api_key', process.env.CLOUDINARY_API_KEY);

      const cloudRes = await fetch(uploadUrl, {
        method: 'POST',
        body: uploadData,
      });

      if (cloudRes.ok) {
        const cloudJson = await cloudRes.json();
        return NextResponse.json({
          ok: true,
          url: cloudJson.secure_url,
          cdn: 'cloudinary',
        });
      }
    }

    // 3. Local filesystem storage with serverless Base64 fallback (Netlify / Vercel)
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        ok: true,
        url: `/uploads/${filename}`,
        cdn: 'local',
      });
    } catch (fsErr: any) {
      console.warn('Local filesystem write unavailable (running on serverless like Netlify):', fsErr.message);

      // Serverless Data URL Fallback: guarantees 100% upload success in read-only environments
      const mimeType = file.type || 'image/jpeg';
      const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

      return NextResponse.json({
        ok: true,
        url: base64Data,
        cdn: 'serverless-base64',
      });
    }
  } catch (err: any) {
    console.error('Upload handler error:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Upload failed' }, { status: 500 });
  }
}
