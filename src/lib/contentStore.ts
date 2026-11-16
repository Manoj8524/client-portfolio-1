import fs from 'fs';
import path from 'path';
import { supabaseAdmin, supabase } from './supabase';

export interface SiteSettings {
  brandName: string;
  statusPill: string;
  studioCoordinates: string;
  mapsUrl: string;
  studioEmail: string;
  studioPhone: string;
  copyright: string;
  socials: {
    instagram: string;
    behance: string;
    youtube: string;
    facebook: string;
    linkedin: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface HeroPosterItem {
  image: string;
  title: string;
}

export interface WorkProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  director?: string;
  client?: string;
  awards?: string;
  featured?: boolean;
}

export interface SiteContent {
  siteSettings: SiteSettings;
  navigation: {
    links: NavigationItem[];
    cta: {
      label: string;
      href: string;
    };
  };
  home: {
    hero: {
      avatar: string;
      bioHeading: string;
      badges: string[];
      ctaPrimary: { label: string; href: string };
      ctaSecondary: { label: string; href: string };
      posterColumns: {
        lane1: HeroPosterItem[];
        lane2: HeroPosterItem[];
        lane3: HeroPosterItem[];
        lane4: HeroPosterItem[];
        lane5: HeroPosterItem[];
      };
    };
    featuredWatch: {
      badge: string;
      title: string;
      description: string;
      image: string;
      cta: { label: string; href: string };
    };
    showcaseCards: Array<{
      tag: string;
      title: string;
      description: string;
      image: string;
      link: string;
    }>;
    splitShowcase?: {
      leftImage: string;
      leftLink: string;
      leftAlt?: string;
      rightImage: string;
      rightLink: string;
      rightAlt?: string;
    };
    disciplines: Array<{
      name: string;
      path: string;
      desc: string;
      slug: string;
    }>;
    brandsTicker: {
      title?: string;
      tag: string;
      image: string;
    };
    zoomSection: {
      word1: string;
      word2: string;
      word3: string;
      backdropImage: string;
      cta: { label: string; href: string };
    };
  };
  about: {
    tag: string;
    headline: string;
    profileImage: string;
    storyParagraphs: string[];
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
    monolith?: {
      tag: string;
      title: string;
      location: string;
      estYear: string;
      pillars: Array<{
        title: string;
        desc: string;
      }>;
    };
    stats: Array<{ value: string; label: string; sub: string }>;
    journeyMilestonesHeading?: {
      tag: string;
      title: string;
    };
    journeyMilestones: Array<{
      year: string;
      title: string;
      role: string;
      desc: string;
    }>;
  };
  works: {
    heroTag?: string;
    title: string;
    subtitle: string;
    backgroundImage?: string;
    categories: string[];
    projects: WorkProjectItem[];
  };
  contact: {
    tag: string;
    headline: string;
    subtitle: string;
    coordinatesTitle?: string;
    officeHours: string;
    formTitle?: string;
    formSubtitle?: string;
    formButtonText?: string;
    cards: {
      emailTitle: string;
      emailSubtitle: string;
      phoneTitle: string;
      phoneSubtitle: string;
      locationTitle: string;
      locationSubtitle: string;
    };
  };
  footer: {
    newsletterHeading: string;
    newsletterDesc: string;
    quickLinks: NavigationItem[];
  };
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  message: string;
  created_at: string;
  status: 'unread' | 'read' | 'archived';
}

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
const MESSAGES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'contactMessages.json');

// In-memory fallback cached copy
let cachedContent: SiteContent | null = null;

function readFallbackContent(): SiteContent {
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const data = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8');
      cachedContent = JSON.parse(data) as SiteContent;
      return cachedContent;
    }
  } catch (err) {
    console.error('Failed to read local fallback content:', err);
  }
  if (cachedContent) return cachedContent;
  return {} as SiteContent;
}

/**
 * Fetch dynamic site content: First tries Supabase DB (table: site_content),
 * falls back to local JSON file if table does not exist or connection fails.
 */
export async function getSiteContentAsync(): Promise<SiteContent> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data, error } = await supabaseAdmin
        .from('site_content')
        .select('data')
        .eq('id', 'current')
        .maybeSingle();

      if (!error && data?.data) {
        cachedContent = data.data as SiteContent;
        return cachedContent;
      }
    }
  } catch (err) {
    console.warn('Supabase getSiteContentAsync warning, falling back to local file:', err);
  }

  return readFallbackContent();
}

/**
 * Synchronous accessor for SSR / initial renders with in-memory caching
 */
export function getSiteContent(): SiteContent {
  if (cachedContent) return cachedContent;
  return readFallbackContent();
}

/**
 * Update site content in Supabase DB and sync to local file for resilient offline backup
 */
export async function updateSiteContent(newContent: Partial<SiteContent>): Promise<{ ok: boolean; error?: string }> {
  try {
    const current = await getSiteContentAsync();
    const merged: SiteContent = {
      ...current,
      ...newContent,
      siteSettings: { ...current.siteSettings, ...(newContent.siteSettings || {}) },
      navigation: { ...current.navigation, ...(newContent.navigation || {}) },
      home: { ...current.home, ...(newContent.home || {}) },
      about: { ...current.about, ...(newContent.about || {}) },
      works: { ...current.works, ...(newContent.works || {}) },
      contact: { ...current.contact, ...(newContent.contact || {}) },
      footer: { ...current.footer, ...(newContent.footer || {}) },
    };

    // 1. Save to Supabase DB (upsert into site_content)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { error: dbError } = await supabaseAdmin
          .from('site_content')
          .upsert({
            id: 'current',
            data: merged,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' });

        if (dbError) {
          console.warn('Supabase update warning (check if table exists):', dbError.message);
        }
      } catch (sbErr) {
        console.warn('Supabase upsert failed:', sbErr);
      }
    }

    // 2. Also persist locally to keep local JSON in sync
    try {
      const tempPath = `${CONTENT_FILE_PATH}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(merged, null, 2), 'utf-8');
      fs.renameSync(tempPath, CONTENT_FILE_PATH);
    } catch (fsErr) {
      console.warn('Local file sync warning:', fsErr);
    }

    cachedContent = merged;
    return { ok: true };
  } catch (err: any) {
    console.error('Error updating site content:', err);
    return { ok: false, error: err.message || 'Failed to update content' };
  }
}

// ---------------------------------------------------------------------------
// CONTACT MESSAGES (SUPABASE + LOCAL BACKUP)
// ---------------------------------------------------------------------------

export async function getContactMessagesAsync(): Promise<ContactMessage[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return data as ContactMessage[];
      }
    }
  } catch (err) {
    console.warn('Supabase fetch messages error, using local fallback:', err);
  }

  return getContactMessages();
}

export function getContactMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE_PATH)) {
      const data = fs.readFileSync(MESSAGES_FILE_PATH, 'utf-8');
      const messages = JSON.parse(data);
      return Array.isArray(messages) ? messages : [];
    }
  } catch (err) {
    console.error('Failed to read contact messages:', err);
  }
  return [];
}

export async function addContactMessage(entry: {
  full_name: string;
  email_address: string;
  phone_number: string;
  message: string;
}): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    full_name: entry.full_name.trim(),
    email_address: entry.email_address.trim(),
    phone_number: entry.phone_number.trim(),
    message: entry.message.trim(),
    created_at: new Date().toISOString(),
    status: 'unread',
  };

  // 1. Insert to Supabase DB
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { error: dbErr } = await supabaseAdmin
        .from('contact_messages')
        .insert([newMessage]);

      if (dbErr) {
        console.warn('Supabase insert message warning:', dbErr.message);
      }
    } catch (sbErr) {
      console.warn('Supabase insert message error:', sbErr);
    }
  }

  // 2. Local fallback sync
  const current = getContactMessages();
  const updated = [newMessage, ...current];
  try {
    const tempPath = `${MESSAGES_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(updated, null, 2), 'utf-8');
    fs.renameSync(tempPath, MESSAGES_FILE_PATH);
  } catch (err) {
    console.error('Error saving local contact message:', err);
  }

  return newMessage;
}

export async function updateContactMessageStatus(id: string, status: 'unread' | 'read' | 'archived'): Promise<boolean> {
  // 1. Supabase update
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      await supabaseAdmin
        .from('contact_messages')
        .update({ status })
        .eq('id', id);
    } catch (sbErr) {
      console.warn('Supabase update status error:', sbErr);
    }
  }

  // 2. Local update
  const current = getContactMessages();
  const index = current.findIndex((m) => m.id === id);
  if (index !== -1) {
    current[index].status = status;
    try {
      const tempPath = `${MESSAGES_FILE_PATH}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(current, null, 2), 'utf-8');
      fs.renameSync(tempPath, MESSAGES_FILE_PATH);
    } catch (err) {
      console.error('Error updating local contact message status:', err);
    }
  }

  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  // 1. Supabase delete
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      await supabaseAdmin
        .from('contact_messages')
        .delete()
        .eq('id', id);
    } catch (sbErr) {
      console.warn('Supabase delete message error:', sbErr);
    }
  }

  // 2. Local delete
  const current = getContactMessages();
  const filtered = current.filter((m) => m.id !== id);
  try {
    const tempPath = `${MESSAGES_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(filtered, null, 2), 'utf-8');
    fs.renameSync(tempPath, MESSAGES_FILE_PATH);
  } catch (err) {
    console.error('Error deleting local contact message:', err);
  }

  return true;
}
