import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const AUTH_COOKIE_NAME = 'muthu_admin_session';
const SESSION_TOKEN = 'muthu_secure_admin_token_2026';

export async function POST(req: NextRequest) {
  // Verify admin authentication
  const cookie = req.cookies.get(AUTH_COOKIE_NAME);
  if (cookie?.value !== SESSION_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. If Cloudinary credentials exist, upload to Cloudinary CDN
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

    // 2. Local Fallback storage in public/uploads/
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '_')
      .replace(/_+/g, '_');
    const filename = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${filename}`,
      cdn: 'local',
    });
  } catch (err: any) {
    console.error('Upload handler error:', err);
    return NextResponse.json({ ok: false, error: err.message || 'Upload failed' }, { status: 500 });
  }
}
