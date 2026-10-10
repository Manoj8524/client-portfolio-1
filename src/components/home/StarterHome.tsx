'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Sparkles, Film, Palette, Layers, Award, Users } from 'lucide-react';
import DepthTicker from './DepthTicker';
import ContactPanel from './ContactPanel';
import ActionBanner from '@/components/ui/ActionBanner';

interface StarterHomeProps {
  services?: any[];
  featuredPosters?: any[];
  clients?: any[];
}

export default function StarterHome({
  services = [],
  featuredPosters = [],
  clients = [],
}: StarterHomeProps) {
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToSections = () => {
    const el = document.getElementById('explore-agency');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#000000] text-white overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      {/* =========================================================================
          HERO SECTION: 3D SLANTED DEPTH TICKER WITH FILM POSTERS
          Exact bio header matching user uploaded image: Avatar + HI, I'M MUTHU...
          ========================================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-8 overflow-hidden">
        {/* Top Header & Intro bio matching user screenshot: Image on left, heading to the right */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 flex flex-row items-start justify-between pointer-events-auto">
          <div className="flex flex-row items-start gap-4 sm:gap-5">
            {/* Avatar Thumbnail (left) */}
            <div className="w-[42px] h-[42px] rounded-[6px] overflow-hidden flex-none bg-[#111] border border-white/10 shadow-sm mt-0.5">
              <img
                src="/starter_assets/ZaApBaIfuKVadeqET6B3KEc3ZGI.png"
                alt="Muthu"
                draggable={false}
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Heading to the right of the image */}
            <div className="w-full max-w-[560px] flex flex-col items-start gap-2.5">
              <h1
                className="text-[17px] sm:text-[19px] font-bold uppercase text-white leading-[1.3] tracking-wide"
                style={{
                  fontFamily: '"Helvetica Neue Medium", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                HI, I’M MUTHU — A GRAPHIC &amp; FILM POSTER DESIGNER BASED IN INDIA, SPECIALIZING IN KEY ART &amp; CINEMATIC VISUALS.
              </h1>

              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() => setContactOpen(true)}
                  className="text-[12px] font-medium uppercase text-white underline hover:text-yellow-400 transition-colors tracking-wide cursor-pointer text-left"
                >
                  GET IN TOUCH
                </button>
                <span className="text-neutral-600">/</span>
                <button
                  onClick={scrollToSections}
                  className="text-[12px] font-medium uppercase text-neutral-400 hover:text-white transition-colors tracking-wide inline-flex items-center gap-1 cursor-pointer"
                >
                  EXPLORE WORKS <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end text-right font-mono text-xs text-neutral-400 space-y-1">
            <span className="text-white font-semibold">FILM POSTER &amp; VISUAL DESIGNER</span>
            <span>180+ OFFICIAL KEY VISUALS</span>
            <span>AVAILABLE FOR FREELANCE &amp; COMMISSIONS</span>
          </div>
        </div>

        {/* Center 3D Depth Ribbon with real film posters */}
        <div className="relative flex-1 w-full flex items-center justify-center my-6 md:my-10 pointer-events-auto">
          <div
            className="w-full h-[355px] relative will-change-transform"
            style={{
              transform: 'perspective(967px) translateZ(186px) rotate(-20deg) rotateX(19deg) rotateY(37deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <DepthTicker />
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 flex flex-row items-center justify-between text-[12px] font-medium text-[rgb(130,130,130)] pointer-events-auto">
          <button
            onClick={scrollToSections}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-yellow-400 group-hover:text-yellow-400 transition-all">
              <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
            </span>
            <span className="uppercase tracking-widest text-[11px] font-mono">Scroll Down To Discover</span>
          </button>

          <div className="flex items-center gap-5 capitalize">
            <a
              href="https://www.behance.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT / CINEMATIC MANIFESTO (DOWN SIDE SECTION)
          ========================================================================= */}
      <section id="explore-agency" className="relative w-full py-28 border-t border-neutral-900 bg-neutral-950/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-mono text-yellow-400 mb-4">
                // ABOUT MUTHU
              </p>
              <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none text-white">
                Designing Iconic Key Art For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-500">
                  Modern Cinema.
                </span>
              </h2>
            </div>
            <p className="font-ppmori text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
              Every story begins with a spark. As a film poster and graphic designer, I transform narrative concepts into striking visual artworks, title typography, and theatrical publicity campaigns that capture audiences from the very first frame.
            </p>
          </div>

          {/* Core Agency Capabilities Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-yellow-400/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-6">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3">
                Key Art &amp; Posters
              </h3>
              <p className="font-ppmori text-sm text-neutral-400 leading-relaxed">
                First-look teasers, release posters, character posters and festival artworks designed to stop scrolls and pack theaters.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-yellow-400/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3">
                Film Promotion
              </h3>
              <p className="font-ppmori text-sm text-neutral-400 leading-relaxed">
                Strategic 360° promotional rollouts, viral digital activations, press launch assets, and motion billboards.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-yellow-400/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3">
                Brand Identity
              </h3>
              <p className="font-ppmori text-sm text-neutral-400 leading-relaxed">
                Distinctive visual universes, logos, typographic systems, and guidelines for global production banners and corporate brands.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-yellow-400/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3">
                Digital &amp; Experience
              </h3>
              <p className="font-ppmori text-sm text-neutral-400 leading-relaxed">
                Modern 3D web experiences, digital marketing, video production, merchandise design, and creative thinkery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED FILM POSTERS SHOWCASE
          ========================================================================= */}
      <section className="relative w-full py-28 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-mono text-yellow-400 mb-3">
                // PORTFOLIO SPOTLIGHT
              </p>
              <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none text-white">
                Featured Film <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
                  Poster Designs.
                </span>
              </h2>
            </div>
            <Link
              href="/works/film-poster-design"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all hover:scale-105 self-start sm:self-auto"
            >
              Explore All 180+ Posters <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Posters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredPosters.map((poster) => {
              const fullImg = poster.image || poster.src;
              return (
                <Link
                  key={poster.id}
                  href={`/works/film-poster-design/${poster.id}`}
                  className="group relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-yellow-400/60 transition-all duration-500 flex flex-col"
                >
                  <div className="aspect-[2/3] w-full overflow-hidden bg-neutral-900 relative">
                    <img
                      src={fullImg}
                      alt={poster.film_name || 'Film Poster'}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <span className="text-xs uppercase tracking-widest font-mono text-yellow-400 flex items-center gap-1.5">
                        View Project <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950 flex flex-col justify-between flex-1 border-t border-neutral-900">
                    <h3 className="font-horas text-lg uppercase tracking-wide text-white truncate group-hover:text-yellow-400 transition-colors">
                      {poster.film_name}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-2">
                      <span>Cinema Key Art</span>
                      <span className="text-neutral-400">{poster.year || '2026'}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: AGENCY SERVICES (CAROUSEL / GRID)
          ========================================================================= */}
      <section className="relative w-full py-28 border-t border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-mono text-yellow-400 mb-3">
              // COMPLETE AGENCY SUITE
            </p>
            <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none text-white mb-6">
              Our Disciplines.
            </h2>
            <p className="font-ppmori text-neutral-400 text-sm md:text-base leading-relaxed">
              We operate across every discipline required to craft, launch, and amplify creative projects on the global stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug || svc.path}
                href={svc.path}
                className="group p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-yellow-400">
                      0{services.indexOf(svc) + 1} //
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-yellow-400 group-hover:rotate-45 transition-all" />
                  </div>
                  <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="font-ppmori text-sm text-neutral-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300">
                  <span>View Projects</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CLIENTS MARQUEE TICKER
          ========================================================================= */}
      {clients.length > 0 && (
        <section className="relative w-full py-20 border-t border-neutral-900 overflow-hidden bg-black">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 mb-10 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
              TRUSTED BY LEADING FILM PRODUCTION HOUSES &amp; BRANDS
            </p>
          </div>

          <div className="w-full overflow-hidden flex gap-8 select-none">
            <div className="flex items-center gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
              {clients.map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm font-horas uppercase tracking-wider hover:border-yellow-400/50 transition-colors flex-shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  {client.name}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap" aria-hidden="true">
              {clients.map((client, idx) => (
                <div
                  key={`${client.name}-dup-${idx}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm font-horas uppercase tracking-wider hover:border-yellow-400/50 transition-colors flex-shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  {client.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 6: CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="relative w-full px-6 sm:px-10 md:px-16 py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <ActionBanner
            normalString="Have an upcoming film, brand or [BR] creative production? [BR]"
            highlightString="Let's Create Together."
            buttonString="Start a Conversation"
            buttonLink="/contact"
          />
        </div>
      </section>

      {/* Contact Panel Modal */}
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
