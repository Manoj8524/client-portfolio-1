'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const serviceLinks = [
  { name: 'BRANDING', path: '/works?category=BRANDING' },
  { name: 'SOCIAL MEDIA CREATIVES', path: '/works?category=SOCIAL+MEDIA+CREATIVES' },
  { name: 'FILM POSTERS', path: '/works?category=FILM+POSTERS' },
  { name: 'PRINT & ADS', path: '/works?category=PRINT+%26+ADS' }
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
      className={`padding-primary fixed top-0 left-0 w-full z-50 flex h-20 shrink-0 items-center justify-between will-change-transform transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/40 border-b border-white/5' : 'bg-transparent'
      }`}
    >
      {/* Permanent top dark scrim protection to guarantee legibility on any background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/85 via-black/35 to-transparent -z-10" />

      {/* Brand / Project Name */}
      <Link href="/" aria-current="page" className="flex items-center gap-2 group relative z-10">
        <div className="py-2">
          <span className="font-horas text-2xl sm:text-3xl font-bold tracking-widest text-white uppercase group-hover:text-[#fec52d] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            MUTHU
          </span>
        </div>
      </Link>

      {/* Mobile Toggle Button */}
      <div className="flex items-center justify-center gap-4 pr-1 md:hidden relative z-10">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-neutral-800 bg-neutral-950/80 backdrop-blur-md hover:bg-neutral-800 text-white h-9 w-9 p-2 shadow-lg"
          type="button"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden items-center justify-center md:flex relative z-10">
        <nav className="hidden items-center gap-2 md:flex bg-transparent p-0.5 rounded-full">
          {/* Home */}
          <Link
            href="/"
            className={`group inline-flex h-9 w-max items-center justify-center rounded-full text-sm font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:text-[#fec52d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${
              pathname === '/' ? 'text-[#fec52d] font-semibold' : 'text-neutral-300'
            }`}
          >
            Home
          </Link>

          {/* Works */}
          <Link
            href="/works"
            className={`group inline-flex h-9 w-max items-center justify-center rounded-full text-sm font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:text-[#fec52d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${
              pathname === '/works' ? 'text-[#fec52d] font-semibold' : 'text-neutral-300'
            }`}
          >
            Works
          </Link>

          {/* Services Dropdown */}
          <div className="group relative">
            <Link
              href="/works"
              className={`group inline-flex h-9 w-max items-center justify-center rounded-full text-sm font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:text-[#fec52d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${
                pathname.startsWith('/works') && pathname !== '/works' ? 'text-[#fec52d] font-semibold' : 'text-neutral-300'
              }`}
            >
              Services
              <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            <div className="invisible absolute left-0 mt-2 w-max rounded-md border border-white/10 bg-neutral-950 opacity-0 ring-0 ring-black ring-opacity-5 backdrop-blur-md transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 z-50 shadow-2xl">
              <div className="p-1" role="menu" aria-orientation="vertical">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    role="menuitem"
                    className={`block rounded px-4 py-2 text-sm transition-colors duration-100 ${
                      pathname === item.path
                        ? 'bg-[#262626] text-[#fec52d] font-medium'
                        : 'text-neutral-300 hover:bg-[#262626] hover:text-[#fec52d]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            className={`group inline-flex h-9 w-max items-center justify-center rounded-full text-sm font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:text-[#fec52d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${
              pathname === '/contact' ? 'text-[#fec52d] font-semibold' : 'text-neutral-300'
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>

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
              href="/works"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-white/10 ${pathname === '/works' ? 'text-yellow-400' : 'text-neutral-300'}`}
            >
              Works
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
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 border-b border-white/10 ${pathname === '/contact' ? 'text-yellow-400' : 'text-neutral-300'}`}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
