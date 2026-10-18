'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'already' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setStatus('idle');

    try {
      const res = await subscribeNewsletter(email);
      if (res && res.ok) {
        setStatus('success');
        setEmail('');
      } else if (res && (res.status === 409 || res.data?.message?.includes('already'))) {
        setStatus('already');
      } else {
        setStatus('success');
        setEmail('');
      }
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
        {/* 4 Column Layout matching 02.psb */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Column 1: Quick Links */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <Link href="/" className="hover:text-[#fec52d] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/works" className="hover:text-[#fec52d] transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#fec52d] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#fec52d] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Follow Us */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              Follow Us
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <a
                  href="https://www.facebook.com/muthu.design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fec52d] transition-colors inline-block"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@muthu_design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fec52d] transition-colors inline-block"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/muthu_design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fec52d] transition-colors inline-block"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/muthudesign"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fec52d] transition-colors inline-block"
                >
                  Behance
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3 group">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-neutral-400 group-hover:text-[#fec52d] transition-colors" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Model+Engineering+College+Thrikkakara+Edappally+Kochi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#fec52d] transition-colors leading-relaxed"
                >
                  Ln-1, Kutty Sahib Layout Rd, near Model Engineering College, Thrikkakara, Edappally, Kochi, 682021
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-[#fec52d] transition-colors" />
                <a
                  href="mailto:info@muthu.design"
                  className="hover:text-[#fec52d] transition-colors"
                >
                  info@muthu.design
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 flex-shrink-0 text-neutral-400 group-hover:text-[#fec52d] transition-colors" />
                <a
                  href="tel:+919048326777"
                  className="hover:text-[#fec52d] transition-colors"
                >
                  +91 9048 326 777
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-[#fec52d] tracking-wide">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Stay updated with our latest offers, products, and more. Sign up for our newsletter.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0e0e0e] border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#fec52d]/60 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-5 rounded-lg bg-[#181408] border border-[#fec52d]/30 text-[#fec52d] text-sm font-medium tracking-wide hover:bg-[#fec52d] hover:text-black transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {status === 'success' && (
              <p className="text-xs text-green-400 bg-green-950/40 border border-green-800/50 p-2.5 rounded-lg">
                Thank you for subscribing!
              </p>
            )}
            {status === 'already' && (
              <p className="text-xs text-yellow-400 bg-yellow-950/40 border border-yellow-800/50 p-2.5 rounded-lg">
                You are already subscribed.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-neutral-900/80 text-center text-xs text-neutral-400 font-mono tracking-wider">
          © 2010 - 2026 Muthu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
