'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import initialContent from '@/data/siteContent.json';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Fetch updated content on mount
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

  const { siteSettings, navigation, home } = content;
  const disciplines = home?.disciplines || [];

  return (
    <header className="padding-primary fixed top-0 left-0 w-full z-50 flex h-20 shrink-0 items-center justify-between will-change-transform bg-transparent">
      {/* Brand / Project Name */}
      <Link href="/" aria-current="page" className="flex items-center gap-2 group">
        <div className="py-2">
          <span className="font-horas text-2xl sm:text-3xl font-bold tracking-widest text-white uppercase group-hover:text-[#fec52d] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            {siteSettings?.brandName || 'MUTHU'}
          </span>
        </div>
      </Link>

      {/* Mobile Toggle Button */}
      <div className="flex items-center justify-center gap-4 pr-1 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-neutral-800 bg-neutral-950 hover:bg-neutral-800 text-white h-9 w-9 p-2 shadow-lg"
          type="button"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden items-center justify-center md:flex">
        <nav className="hidden items-center gap-2 md:flex bg-transparent p-0.5 rounded-full">
          {navigation?.links?.map((link) => {
            if (link.label.toLowerCase() === 'services') {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button
                    className={`group inline-flex h-9 w-max items-center justify-center rounded-full text-sm font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:text-[#fec52d] cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${
                      pathname?.startsWith('/works?category=') ? 'text-[#fec52d] font-semibold' : 'text-neutral-300'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 w-64 pt-2 z-50">
                      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-xl">
                        {disciplines.map((svc) => (
                          <Link
                            key={svc.slug || svc.name}
                            href={svc.path}
                            className="block rounded-xl px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:bg-neutral-900 hover:text-[#fec52d] transition-colors"
                          >
                            {svc.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`group inline-flex h-9 w-max items-center justify-center rounded-full text-sm font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:text-[#fec52d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${
                  isActive ? 'text-[#fec52d] font-semibold' : 'text-neutral-300'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right Header Contact Action */}
      <div className="hidden lg:flex items-center gap-4">
        {siteSettings?.statusPill ? (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/70 border border-neutral-800/80 text-[11px] font-mono tracking-wider text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fec52d] animate-pulse" />
            <span>{siteSettings.statusPill}</span>
          </div>
        ) : null}

        <Link
          href={navigation?.cta?.href || '/contact'}
          className="px-5 py-2 rounded-full bg-white text-black hover:bg-[#fec52d] text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 hover:scale-105"
        >
          {navigation?.cta?.label || 'GET IN TOUCH'}
        </Link>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-neutral-950/98 border-b border-neutral-800 px-6 py-6 md:hidden flex flex-col gap-4 shadow-2xl backdrop-blur-2xl">
          {navigation?.links?.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium transition-colors ${
                pathname === link.href ? 'text-[#fec52d] font-bold' : 'text-neutral-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-neutral-900 flex flex-col gap-3">
            {siteSettings?.statusPill ? (
              <span className="text-xs font-mono text-neutral-500">
                {siteSettings.statusPill}
              </span>
            ) : null}
            <Link
              href={navigation?.cta?.href || '/contact'}
              className="w-full py-3 text-center rounded-xl bg-[#fec52d] text-black font-semibold text-xs uppercase tracking-wider"
            >
              {navigation?.cta?.label || 'GET IN TOUCH'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
