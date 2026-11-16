-- =========================================================================
-- SUPABASE MIGRATION: Site Content & Contact Messages
-- Run this in your Supabase Dashboard -> SQL Editor
-- =========================================================================

-- 1. Create table for dynamic site content
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'current',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create table for dynamic contact inquiries
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email_address TEXT NOT NULL,
  phone_number TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. Policies for site_content
-- Anyone can view site content (Public read)
DROP POLICY IF EXISTS "Public can view site content" ON public.site_content;
CREATE POLICY "Public can view site content" ON public.site_content
  FOR SELECT USING (true);

-- Authenticated / Service role can insert or update site content
DROP POLICY IF EXISTS "Service role full access on site content" ON public.site_content;
CREATE POLICY "Service role full access on site content" ON public.site_content
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Policies for contact_messages
-- Anyone can submit inquiries (Public insert)
DROP POLICY IF EXISTS "Public can insert contact message" ON public.contact_messages;
CREATE POLICY "Public can insert contact message" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Authenticated / Service role full access on contact messages
DROP POLICY IF EXISTS "Service role full access on contact messages" ON public.contact_messages;
CREATE POLICY "Service role full access on contact messages" ON public.contact_messages
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Storage bucket policy for portfolio-media
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view portfolio media" ON storage.objects;
CREATE POLICY "Public can view portfolio media" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Public/Service can upload portfolio media" ON storage.objects;
CREATE POLICY "Public/Service can upload portfolio media" ON storage.objects
  FOR ALL USING (bucket_id = 'portfolio-media') WITH CHECK (bucket_id = 'portfolio-media');
