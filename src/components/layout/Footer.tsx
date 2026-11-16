'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import initialContent from '@/data/siteContent.json';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [content, setContent] = useState(initialContent);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.siteSettings) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const { siteSettings, footer } = content;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setStatus('idle');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'Newsletter Subscriber',
          email_address: email,
          phone_number: '',
          message: 'Subscribed to studio newsletter',
        }),
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('success');
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-black text-white border-t border-neutral-900/80 pt-16 pb-12 font-ppmori selection:bg-[#fec52d] selection:text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Column 1: Quick Links */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              {footer?.quickLinks?.map((lnk) => (
                <li key={lnk.label}>
                  <Link href={lnk.href} className="hover:text-[#fec52d] transition-colors">
                    {lnk.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Follow Us */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              Follow Us
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              {siteSettings?.socials?.facebook && (
                <li>
                  <a
                    href={siteSettings.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#fec52d] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {siteSettings?.socials?.youtube && (
                <li>
                  <a
                    href={siteSettings.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#fec52d] transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              )}
              {siteSettings?.socials?.instagram && (
                <li>
                  <a
                    href={siteSettings.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#fec52d] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {siteSettings?.socials?.behance && (
                <li>
                  <a
                    href={siteSettings.socials.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#fec52d] transition-colors"
                  >
                    Behance
                  </a>
                </li>
              )}
              {siteSettings?.socials?.linkedin && (
                <li>
                  <a
                    href={siteSettings.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#fec52d] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Contact Us Coordinates */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm text-neutral-300">
              <a
                href={siteSettings?.mapsUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin className="w-5 h-5 text-neutral-500 group-hover:text-[#fec52d] shrink-0 mt-0.5 transition-colors" />
                <span className="group-hover:text-white transition-colors leading-relaxed">
                  {siteSettings?.studioCoordinates}
                </span>
              </a>

              <a
                href={`mailto:${siteSettings?.studioEmail || 'info@muthu.design'}`}
                className="flex items-center gap-3 group"
              >
                <Mail className="w-5 h-5 text-neutral-500 group-hover:text-[#fec52d] shrink-0 transition-colors" />
                <span className="group-hover:text-[#fec52d] transition-colors">
                  {siteSettings?.studioEmail}
                </span>
              </a>

              <a
                href={`tel:${siteSettings?.studioPhone?.replace(/\s+/g, '') || ''}`}
                className="flex items-center gap-3 group"
              >
                <Phone className="w-5 h-5 text-neutral-500 group-hover:text-[#fec52d] shrink-0 transition-colors" />
                <span className="group-hover:text-[#fec52d] transition-colors">
                  {siteSettings?.studioPhone}
                </span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              {footer?.newsletterHeading || 'Subscribe to Our Newsletter'}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {footer?.newsletterDesc || 'Stay updated with our latest offers, products, and more.'}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#fec52d] transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-lg border border-[#fec52d]/60 bg-[#fec52d]/10 hover:bg-[#fec52d] text-[#fec52d] hover:text-black text-sm font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>

              {status === 'success' && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully! Thank you.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>{siteSettings?.copyright || '© 2026 MUTHU. ALL RIGHTS RESERVED.'}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">
              Contact Us
            </Link>
            <Link href="/admin" className="text-neutral-700 hover:text-[#fec52d] transition-colors">
              Studio Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
