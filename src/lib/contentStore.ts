import fs from 'fs';
import path from 'path';

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
    disciplines: Array<{
      name: string;
      path: string;
      desc: string;
      slug: string;
    }>;
    brandsTicker: {
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
    stats: Array<{ value: string; label: string; sub: string }>;
    journeyMilestones: Array<{
      year: string;
      title: string;
      role: string;
      desc: string;
    }>;
  };
  works: {
    title: string;
    subtitle: string;
    categories: string[];
    projects: WorkProjectItem[];
  };
  contact: {
    tag: string;
    headline: string;
    subtitle: string;
    officeHours: string;
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

export function getSiteContent(): SiteContent {
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const data = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8');
      cachedContent = JSON.parse(data) as SiteContent;
      return cachedContent;
    }
  } catch (err) {
    console.error('Failed to read site content file, using cached content:', err);
  }

  if (cachedContent) return cachedContent;

  // Fallback requires initial data if file is missing
  return JSON.parse(fs.readFileSync(CONTENT_FILE_PATH, 'utf-8'));
}

export async function updateSiteContent(newContent: Partial<SiteContent>): Promise<{ ok: boolean; error?: string }> {
  try {
    const current = getSiteContent();
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

    const tempPath = `${CONTENT_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(merged, null, 2), 'utf-8');
    fs.renameSync(tempPath, CONTENT_FILE_PATH);
    cachedContent = merged;
    return { ok: true };
  } catch (err: any) {
    console.error('Error updating site content:', err);
    return { ok: false, error: err.message || 'Failed to update content' };
  }
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

export function addContactMessage(entry: {
  full_name: string;
  email_address: string;
  phone_number: string;
  message: string;
}): ContactMessage {
  const current = getContactMessages();
  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    full_name: entry.full_name.trim(),
    email_address: entry.email_address.trim(),
    phone_number: entry.phone_number.trim(),
    message: entry.message.trim(),
    created_at: new Date().toISOString(),
    status: 'unread',
  };

  const updated = [newMessage, ...current];
  try {
    const tempPath = `${MESSAGES_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(updated, null, 2), 'utf-8');
    fs.renameSync(tempPath, MESSAGES_FILE_PATH);
  } catch (err) {
    console.error('Error saving contact message:', err);
  }

  return newMessage;
}

export function updateContactMessageStatus(id: string, status: 'unread' | 'read' | 'archived'): boolean {
  const current = getContactMessages();
  const index = current.findIndex((m) => m.id === id);
  if (index === -1) return false;

  current[index].status = status;
  try {
    const tempPath = `${MESSAGES_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(current, null, 2), 'utf-8');
    fs.renameSync(tempPath, MESSAGES_FILE_PATH);
    return true;
  } catch (err) {
    console.error('Error updating contact message status:', err);
    return false;
  }
}

export function deleteContactMessage(id: string): boolean {
  const current = getContactMessages();
  const filtered = current.filter((m) => m.id !== id);
  try {
    const tempPath = `${MESSAGES_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(filtered, null, 2), 'utf-8');
    fs.renameSync(tempPath, MESSAGES_FILE_PATH);
    return true;
  } catch (err) {
    console.error('Error deleting contact message:', err);
    return false;
  }
}
