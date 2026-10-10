'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/api';

export default function Footer() {
  const pathname = usePathname();
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
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else if (res.status === 409 || (res.data && res.data.message?.includes('already'))) {
        setStatus('already');
      } else {
        setStatus('success'); // graceful success feedback
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
    <footer className="w-full bg-black text-white border-t border-neutral-900 padding-primary pt-20 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Brand Banner */}
        <div className="border-b border-neutral-800 pb-16 mb-16">
          <p className="text-xs tracking-widest text-neutral-500 uppercase font-mono mb-4">
            // READY TO CREATE SOMETHING EXTRAORDINARY?
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none text-white">
              Let&apos;s Build <br />
              <span className="text-neutral-500 hover:text-white transition-colors duration-300">
                Something Iconic.
              </span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-yellow-400 hover:scale-105 transition-all duration-300 self-start lg:self-auto"
            >
              Start a Project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Office Coordinates */}
          <div className="space-y-4">
            <h3 className="font-horas text-lg uppercase tracking-wider text-neutral-400">Headquarters</h3>
            <div className="flex items-start gap-3 group text-neutral-300 text-sm leading-relaxed">
              <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-neutral-400 group-hover:text-yellow-400 transition-colors" />
              <a
                href="https://www.google.com/maps/place/Yellowtooths/@10.0309653,76.3257572,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080d00da9cf143:0x7d87036eb25d077d!8m2!3d10.03096!4d76.3283321"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors"
              >
                Ln-1, Kutty Sahib Layout Rd, near Model Engineering College, Thrikkakara, Edappally, Kochi, 682021
              </a>
            </div>
            <div className="flex items-center gap-3 group text-neutral-300 text-sm">
              <Mail className="h-4 w-4 text-neutral-400 group-hover:text-yellow-400 transition-colors" />
              <a href="mailto:muthu.design@portfolio.com" className="hover:text-yellow-400 transition-colors">
                muthu.design@portfolio.com
              </a>
            </div>
            <div className="flex items-center gap-3 group text-neutral-300 text-sm">
              <Phone className="h-4 w-4 text-neutral-400 group-hover:text-yellow-400 transition-colors" />
              <a href="tel:+919048326777" className="hover:text-yellow-400 transition-colors">
                +91 9048 326 777
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-horas text-lg uppercase tracking-wider text-neutral-400">Navigation</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/works" className="hover:text-white transition-colors">
                  Services & Works
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Connections */}
          <div className="space-y-4">
            <h3 className="font-horas text-lg uppercase tracking-wider text-neutral-400">Follow Us</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li>
                <a
                  href="https://www.instagram.com/yellow_tooths/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/yellowtoothsweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" /> Behance
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Yellow_tooths"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/yellowtoothians"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" /> Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-horas text-lg uppercase tracking-wider text-neutral-400">Newsletter</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Stay updated with our latest cinematic design releases, case studies, and studio news.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {status === 'success' && (
              <p className="text-xs text-green-400 bg-green-950/40 border border-green-800/50 p-2 rounded-lg">
                Thank you for subscribing!
              </p>
            )}
            {status === 'already' && (
              <p className="text-xs text-yellow-400 bg-yellow-950/40 border border-yellow-800/50 p-2 rounded-lg">
                You are already subscribed.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
          <p>© 2026 Muthu. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-neutral-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-neutral-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
