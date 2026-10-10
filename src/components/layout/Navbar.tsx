'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const serviceLinks = [
  { name: 'Film Poster Design', path: '/works/film-poster-design' },
  { name: 'Film Promotion', path: '/works/film-promotion' },
  { name: 'Branding', path: '/works/branding' },
  { name: 'Digital Marketing', path: '/works/digital-marketing' },
  { name: 'Technology & Experience Design', path: '/works/technology-&-experience-design' },
  { name: 'Video Production', path: '/works/video-production' },
  { name: 'Merchandising', path: '/works/merchandising' },
  { name: 'Thinkery', path: '/works/thinkery' },
  { name: 'Global Academy of Artistry', path: '/works/global-academy-of-artistry' }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 flex items-center justify-between padding-primary ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <span className="font-horas text-2xl font-bold tracking-widest text-white uppercase group-hover:text-yellow-400 transition-colors">
          MUTHU
        </span>
        <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
          / PORTFOLIO
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
        <Link
          href="/"
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
            pathname === '/' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white'
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
            pathname === '/about' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white'
          }`}
        >
          About
        </Link>

        {/* Services Dropdown */}
        <div className="relative group">
          <Link
            href="/works"
            className={`px-4 py-2 text-sm font-medium inline-flex items-center gap-1 transition-colors rounded-full ${
              pathname.startsWith('/works') ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Services
            <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
          </Link>

          <div className="absolute top-full left-0 mt-2 w-64 p-2 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
            {serviceLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 text-xs rounded-xl transition-colors ${
                  pathname === item.path
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/gallery"
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
            pathname === '/gallery' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white'
          }`}
        >
          Gallery
        </Link>
        <Link
          href="/careers"
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
            pathname === '/careers' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white'
          }`}
        >
          Careers
        </Link>
      </nav>

      {/* Contact CTA */}
      <div className="hidden md:flex items-center">
        <Link
          href="/contact"
          className="px-5 py-2 text-sm font-medium text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-200 shadow-md hover:scale-105"
        >
          Let's Talk
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-black/95 backdrop-blur-2xl z-40 flex flex-col padding-primary py-8 overflow-y-auto">
          <div className="flex flex-col space-y-4 font-horas text-3xl uppercase tracking-wider">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-white/10 ${pathname === '/' ? 'text-yellow-400' : 'text-neutral-300'}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-white/10 ${pathname === '/about' ? 'text-yellow-400' : 'text-neutral-300'}`}
            >
              About
            </Link>
            <div>
              <div
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="py-2 border-b border-white/10 flex items-center justify-between cursor-pointer text-neutral-300"
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              {servicesDropdownOpen && (
                <div className="pl-4 py-2 flex flex-col space-y-2 font-ppmori text-sm normal-case">
                  <Link
                    href="/works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-yellow-400 py-1"
                  >
                    View All Works →
                  </Link>
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.path}
                      href={s.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-neutral-400 hover:text-white py-1"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-white/10 ${pathname === '/gallery' ? 'text-yellow-400' : 'text-neutral-300'}`}
            >
              Gallery
            </Link>
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-white/10 ${pathname === '/careers' ? 'text-yellow-400' : 'text-neutral-300'}`}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-white/10 ${pathname === '/contact' ? 'text-yellow-400' : 'text-neutral-300'}`}
            >
              Contact
            </Link>
          </div>

          <div className="mt-auto pt-8">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 text-base font-semibold text-black bg-white rounded-full hover:bg-neutral-200"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
