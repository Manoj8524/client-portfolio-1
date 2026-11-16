'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteContent, HeroPosterItem } from '@/lib/contentStore';
import defaultContent from '@/data/siteContent.json';

interface StarterHomeProps {
  initialData?: SiteContent;
}

export default function StarterHome({ initialData }: StarterHomeProps) {
  const [content, setContent] = useState<SiteContent>(initialData || (defaultContent as SiteContent));
  const watchRef = useRef<HTMLDivElement>(null);
  const galaxyContainerRef = useRef<HTMLDivElement>(null);

  // Sync latest updates from content store on mount
  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.home) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  // Featured watch scroll parallax
  const { scrollYProgress: watchProgress } = useScroll({
    target: watchRef,
    offset: ['start end', 'end start'],
  });
  const watchScale = useTransform(watchProgress, [0, 0.5, 1], [0.98, 1.02, 0.99]);

  // Galaxy Zoom pinned portal dive into the "O"
  const { scrollYProgress: galaxyProgress } = useScroll({
    target: galaxyContainerRef,
    offset: ['start start', 'end end'],
  });

  // Scale smoothly zooms from 1 to 35, plunging deep into the circular hollow of the "O"
  const galaxyZoom = useTransform(galaxyProgress, [0.1, 0.98], [1, 35]);

  // Center CTA button fades out quickly as dive begins
  const galaxyCtaOpacity = useTransform(galaxyProgress, [0, 0.25], [1, 0]);
  const galaxyCtaY = useTransform(galaxyProgress, [0, 0.25], [0, 30]);

  const scrollToNext = () => {
    const el = document.getElementById('featured-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderColumn = (posters: HeroPosterItem[], animationClass: string) => {
    const loopPosters = [...posters, ...posters];
    return (
      <div className="relative flex-1 h-full overflow-hidden select-none">
        <div className={`flex flex-col gap-3 sm:gap-4 md:gap-5 ${animationClass}`}>
          {loopPosters.map((poster, idx) => (
            <div
              key={`${poster.image}-${idx}`}
              className="group/poster relative aspect-[2/3] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl flex-shrink-0"
            >
              <Image
                src={poster.image}
                alt={poster.title || 'Film Poster'}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover object-center group-hover/poster:scale-105 transition-transform duration-700 ease-out select-none"
                priority={idx < 4}
                loading={idx < 4 ? undefined : 'lazy'}
                quality={85}
              />
              <div className="absolute inset-0 bg-black/15 group-hover/poster:bg-black/0 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const { home } = content;
  const { hero, featuredWatch, showcaseCards, disciplines, brandsTicker, zoomSection } = home;

  return (
    <div className="w-full bg-black text-white font-ppmori overflow-x-hidden p-0 m-0 selection:bg-[#fec52d] selection:text-black">
      {/* =========================================================================
          SECTION 1: HERO - DYNAMIC 5-COLUMN CONTINUOUS VERTICAL POSTER MATRIX
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between items-center overflow-hidden pt-20 p-0 m-0">
        {/* Background 5-Column Continuous Upward Scrolling Poster Lanes */}
        <div className="absolute inset-0 z-0 flex gap-3 sm:gap-4 md:gap-5 px-3 sm:px-6 md:px-8 py-0 overflow-hidden pointer-events-none select-none">
          {renderColumn(hero.posterColumns?.lane1 || [], 'animate-scroll-lane-1')}
          {renderColumn(hero.posterColumns?.lane2 || [], 'animate-scroll-lane-2')}
          {renderColumn(hero.posterColumns?.lane3 || [], 'animate-scroll-lane-3')}
          <div className="hidden sm:block flex-1 h-full">
            {renderColumn(hero.posterColumns?.lane4 || [], 'animate-scroll-lane-4')}
          </div>
          <div className="hidden md:block flex-1 h-full">
            {renderColumn(hero.posterColumns?.lane5 || [], 'animate-scroll-lane-5')}
          </div>
        </div>

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/95 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90 z-10 pointer-events-none" />

        {/* Top Header & Intro Bio Overlay */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 flex flex-row items-start justify-between pointer-events-auto pt-6">
          <div className="flex flex-row items-start gap-4 sm:gap-5">
            {/* Avatar Thumbnail */}
            <div className="w-[44px] h-[44px] rounded-lg overflow-hidden flex-none bg-[#111] border border-white/15 shadow-2xl mt-0.5">
              <Image
                src={hero.avatar || '/starter_assets/ZaApBaIfuKVadeqET6B3KEc3ZGI.png'}
                alt="Muthu"
                width={44}
                height={44}
                priority
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Heading text */}
            <div className="w-full max-w-[560px] flex flex-col items-start gap-2.5">
              <h1 className="text-[17px] sm:text-[19px] font-bold uppercase text-white leading-[1.3] tracking-wide font-ppmori">
                {hero.bioHeading}
              </h1>

              <div className="flex items-center gap-4 pt-1 text-[12px] font-medium uppercase tracking-wide">
                <Link
                  href={hero.ctaPrimary?.href || '/contact'}
                  className="text-white underline hover:text-[#fec52d] transition-colors"
                >
                  {hero.ctaPrimary?.label || 'GET IN TOUCH'}
                </Link>
                <span className="text-neutral-600">/</span>
                <Link
                  href={hero.ctaSecondary?.href || '/works'}
                  className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{hero.ctaSecondary?.label || 'EXPLORE WORKS'}</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Badges */}
          <div className="hidden lg:flex flex-col items-end text-right font-mono text-xs text-neutral-400 space-y-1 select-none">
            {hero.badges?.map((badge, idx) => (
              <span key={idx} className={idx === 0 ? 'text-white font-semibold' : ''}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 pb-8 flex flex-row items-center justify-between text-[12px] font-medium text-[rgb(130,130,130)] pointer-events-auto">
          <button
            onClick={scrollToNext}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-[#fec52d] group-hover:text-[#fec52d] transition-colors">
              <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
            </span>
            <span className="uppercase tracking-widest text-[11px] font-mono">SCROLL TO DISCOVER</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#fec52d] animate-pulse" />
            <span>CONTINUOUS CINEMATIC FEED</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURED CASE SHOWCASE
          ========================================================================= */}
      <section
        id="featured-showcase"
        ref={watchRef}
        className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden border-t border-neutral-900/80 p-0 m-0"
      >
        <motion.div style={{ scale: watchScale }} className="absolute inset-0 z-0 will-change-transform">
          <Image
            src={featuredWatch.image || '/extracted_assets/home/home_featured_watch.webp'}
            alt={featuredWatch.title}
            fill
            sizes="100vw"
            className="object-cover object-center select-none"
            quality={92}
          />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-1" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-[#fec52d] text-xs font-mono uppercase tracking-[0.25em] backdrop-blur-md">
            <span>{featuredWatch.badge}</span>
          </div>
          <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {featuredWatch.title}
          </h2>
          <p className="font-ppmori text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
            {featuredWatch.description}
          </p>
          <Link
            href={featuredWatch.cta?.href || '/works'}
            className="mt-4 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white hover:bg-[#fec52d] hover:text-black hover:scale-105 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl flex items-center gap-2 group"
          >
            <span>{featuredWatch.cta?.label || 'Explore Case Study'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 3-TIER SHOWCASE CARDS
          ========================================================================= */}
      <section className="relative w-full border-t border-neutral-900/80 bg-black p-0 m-0">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-900/80">
          {showcaseCards?.map((card, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[9/16] lg:aspect-[3/4] w-full overflow-hidden group"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center select-none group-hover:scale-105 transition-transform duration-700 ease-out"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-1" />
              <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10 pointer-events-none">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#fec52d]">
                  {card.tag}
                </span>
                <div>
                  <h3 className="font-horas text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="font-ppmori text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <Link
                    href={card.link || '/works'}
                    className="pointer-events-auto inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#fec52d] hover:underline"
                  >
                    <span>View Projects</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DISCIPLINES & SERVICES
          ========================================================================= */}
      <section className="relative w-full py-24 sm:py-32 bg-black border-t border-neutral-900/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="max-w-3xl mb-16 sm:mb-20">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">
              // COMPLETE AGENCY SUITE
            </p>
            <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none text-white mb-6">
              Our Disciplines.
            </h2>
            <p className="font-ppmori text-neutral-400 text-sm md:text-base leading-relaxed">
              We operate across every discipline required to craft, launch, and amplify creative projects on the global stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines?.map((svc, idx) => (
              <Link
                key={svc.slug || idx}
                href={svc.path}
                className="group p-8 rounded-3xl bg-neutral-950/80 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#fec52d]">
                      0{idx + 1} //
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-[#fec52d] group-hover:rotate-45 transition-all" />
                  </div>
                  <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3 group-hover:text-[#fec52d] transition-colors">
                    {svc.name}
                  </h3>
                  <p className="font-ppmori text-sm text-neutral-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300">
                  <span>View Projects</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CLIENTS MARQUEE TICKER (Restored from 01.psb)
          ========================================================================= */}
      <section className="w-full py-12 sm:py-16 bg-black border-t border-neutral-900/80 overflow-hidden">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-500">
            {brandsTicker?.tag || '// Trusted By Premier Studios & Visionary Brands'}
          </p>
        </div>

        <div className="relative w-full overflow-hidden select-none py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="animate-marquee flex items-center">
            <div className="flex-shrink-0 h-20 sm:h-28 md:h-36 w-auto flex items-center pr-12">
              <img
                src={brandsTicker?.image || '/extracted_assets/home/home_brands_ticker.webp'}
                alt="Partner Brands"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
            <div className="flex-shrink-0 h-20 sm:h-28 md:h-36 w-auto flex items-center pr-12" aria-hidden="true">
              <img
                src={brandsTicker?.image || '/extracted_assets/home/home_brands_ticker.webp'}
                alt="Partner Brands"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ZOOM INTO THE "O" CINEMATIC DIVE SECTION
          ========================================================================= */}
      <section
        ref={galaxyContainerRef}
        className="relative w-full h-[175vh] bg-black p-0 m-0 border-t border-neutral-900/80"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src={zoomSection?.backdropImage || '/extracted_assets/home/plain_portal_bg.webp'}
              alt="Cinematic Portal Backdrop"
              fill
              sizes="100vw"
              className="object-cover object-center select-none opacity-90"
              quality={90}
            />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black z-1" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-1" />
          </div>

          <motion.div
            style={{
              scale: galaxyZoom,
              transformOrigin: '46.5% 33%',
            }}
            className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center will-change-transform select-none"
          >
            <div className="flex flex-col items-center text-center">
              {/* Line 1: ZOOM */}
              <div className="font-horas text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase font-bold tracking-tight text-white leading-[0.88] drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] flex items-center justify-center">
                <span>Z</span>
                <span className="relative inline-flex items-center justify-center text-[#fec52d]">
                  O
                  <span className="absolute w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-black shadow-inner" />
                </span>
                <span>O</span>
                <span>M</span>
              </div>

              {/* Line 2: INTO THE */}
              <div className="font-horas text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.25em] text-neutral-300 font-semibold mt-2 sm:mt-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                {zoomSection?.word2 || 'INTO THE'}
              </div>

              {/* Line 3: EXTRAORDINARY */}
              <div className="font-horas text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white font-bold mt-1 sm:mt-2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                {zoomSection?.word3 || 'EXTRAORDINARY'}
              </div>
            </div>

            <motion.div
              style={{
                opacity: galaxyCtaOpacity,
                y: galaxyCtaY,
              }}
              className="mt-8 sm:mt-10 pointer-events-auto"
            >
              <Link
                href={zoomSection?.cta?.href || '/contact'}
                className="px-9 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white hover:bg-[#fec52d] hover:text-black hover:scale-105 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl flex items-center gap-3 group"
              >
                <span>{zoomSection?.cta?.label || 'Initiate Collaboration'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
