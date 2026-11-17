'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteContent, HeroPosterItem } from '@/lib/contentStore';
import defaultContent from '@/data/siteContent.json';

interface StarterHomeProps {
  initialData?: SiteContent;
}

export default function StarterHome({ initialData }: StarterHomeProps) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialData || (defaultContent as SiteContent));
  const [navigating, setNavigating] = useState(false);
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

  // ─── SECTION 6: Ultra-Smooth Full Cinematic Portal Dive ─────────────────────
  const { scrollYProgress: galaxyProgress } = useScroll({
    target: galaxyContainerRef,
    offset: ['start start', 'end end'],
  });

  // Spring-dampened scroll progress for physics-based smoothness
  const smoothProgress = useSpring(galaxyProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.0001,
  });

  // Backdrop zooms majestically from 1× to 2.8× — full cinematic pull-in
  const backdropScale = useTransform(smoothProgress, [0, 0.75], [1, 2.8]);

  // Backdrop filter string: brightness dims to 0 as works page takes over
  const backdropBrightness = useTransform(smoothProgress, [0.3, 0.70], [1, 0]);
  const backdropFilter = useTransform(backdropBrightness, (v: number) => `brightness(${v})`);

  // "ZOOM INTO THE EXTRAORDINARY" text: fades out in first 20% of scroll
  const textOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const textScale  = useTransform(smoothProgress, [0, 0.20], [1, 1.12]);

  // CTA button fades out even faster
  const ctaOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  // Works hero fullscreen fade-in: starts at 25%, fully visible by 65%
  const worksOpacity = useTransform(smoothProgress, [0.22, 0.60], [0, 1]);
  const worksScale   = useTransform(smoothProgress, [0.22, 0.65], [1.06, 1.0]);
  const worksContentY = useTransform(smoothProgress, [0.25, 0.65], [30, 0]);

  // Navbar fades out as works hero takes over for seamless page blending
  const navbarOpacity = useTransform(smoothProgress, [0.3, 0.60], [1, 0]);

  // Write navbar opacity to CSS variable on the document root
  useEffect(() => {
    const unsubscribe = navbarOpacity.on('change', (v) => {
      document.documentElement.style.setProperty('--zoom-navbar-opacity', String(v));
    });
    return () => {
      unsubscribe();
      document.documentElement.style.removeProperty('--zoom-navbar-opacity');
    };
  }, [navbarOpacity]);

  // Trigger route push at 72% scroll — works page fully visible before nav happens
  useEffect(() => {
    router.prefetch('/works');
    const unsubscribe = galaxyProgress.on('change', (latest) => {
      if (latest >= 0.72 && !navigating) {
        setNavigating(true);
        router.push('/works');
      }
    });
    return () => unsubscribe();
  }, [galaxyProgress, navigating, router]);

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
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover object-center group-hover/poster:scale-105 transition-transform duration-700 ease-out select-none"
                priority={idx < 4}
                loading={idx < 4 ? undefined : 'lazy'}
                quality={85}
              />
              <div className="absolute inset-0 bg-black/0 group-hover/poster:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const { home } = content;
  const { hero, brandsTicker, zoomSection } = home;

  return (
    <div className="w-full bg-black text-white font-ppmori overflow-x-hidden p-0 m-0 selection:bg-[#fec52d] selection:text-black">
      {/* =========================================================================
          SECTION 1: HERO - DYNAMIC 5-COLUMN CONTINUOUS VERTICAL POSTER MATRIX
          Mobile: Exactly 3 responsive columns visible
          Tablet / Desktop: 4 to 5 continuous lanes
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between items-center overflow-hidden pt-20 p-0 m-0">
        {/* Background Continuous Upward Scrolling Poster Lanes */}
        <div className="absolute inset-0 z-0 flex gap-2.5 sm:gap-4 md:gap-5 px-2 sm:px-6 md:px-8 py-0 overflow-hidden pointer-events-none select-none">
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

        {/* Cinematic Vignette Overlays - Softened for clear, vibrant poster visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/35 z-10 pointer-events-none" />

        {/* Top spacer */}
        <div className="h-10" />

        {/* Clean Hero View matching full poster wall */}
        <div className="flex-1" />

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
          SECTION 2: 3-COLUMN SHOWCASE CARDS (Classic Full-Bleed 01.psb Design)
          ZERO GAP, ZERO PADDING, EDGE-TO-EDGE
          ========================================================================= */}
      <section
        id="featured-showcase"
        className="w-full p-0 m-0 bg-black border-t border-neutral-900/80"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 p-0 m-0">
          {(home.showcaseCards || []).slice(0, 3).map((card, idx) => (
            <Link
              key={idx}
              href={card.link || '/works'}
              className={`group relative aspect-[1600/2012] w-full block overflow-hidden rounded-none border-neutral-900/80 bg-neutral-950 ${
                idx < 2 ? 'border-b md:border-b-0 md:border-r' : ''
              }`}
            >
              <Image
                src={card.image || `/extracted_assets/home/home_showcase_${idx + 1}.webp`}
                alt={card.title || 'Portfolio Showcase'}
                fill
                sizes="(max-width: 768px) 100vw, 33.33vw"
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-[#fec52d] text-black flex items-center justify-center shadow-lg">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WIDE FEATURED PROJECT (Classic Full-Bleed 01.psb Design)
          ZERO GAP WITH SECTION 2, FULL BLEED EDGE-TO-EDGE
          ========================================================================= */}
      <section
        ref={watchRef}
        className="w-full p-0 m-0 bg-black overflow-hidden border-t border-neutral-900/80"
      >
        <Link
          href={home.featuredWatch?.cta?.href || '/works?category=PRINT+%26+ADS'}
          className="group relative block aspect-[4800/1983] w-full overflow-hidden rounded-none bg-neutral-950 cursor-pointer"
        >
          <motion.div style={{ scale: watchScale }} className="relative w-full h-full will-change-transform">
            <Image
              src={home.featuredWatch?.image || '/extracted_assets/home/home_featured_watch.webp'}
              alt={home.featuredWatch?.title || 'Featured Project'}
              fill
              sizes="100vw"
              className="object-cover object-center select-none group-hover:scale-105 transition-transform duration-1000 ease-out"
              quality={92}
            />
          </motion.div>
        </Link>
      </section>

      {/* =========================================================================
          SECTION 4: SPLIT 2-COLUMN SHOWCASE (Classic Full-Bleed 01.psb Design)
          ZERO GAP, FULL BLEED EDGE-TO-EDGE
          ========================================================================= */}
      <section className="w-full p-0 m-0 bg-black border-t border-neutral-900/80">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 p-0 m-0">
          {/* Left: Laptop Mockup (Width 2788 / 4800 ~ 58%) */}
          <Link
            href={home.splitShowcase?.leftLink || '/works?category=PRINT+%26+ADS'}
            className="lg:col-span-7 group relative block aspect-[2788/1437] w-full overflow-hidden rounded-none border-b lg:border-b-0 lg:border-r border-neutral-900/80 bg-neutral-950"
          >
            <Image
              src={home.splitShowcase?.leftImage || '/extracted_assets/home/home_split_laptop.webp'}
              alt={home.splitShowcase?.leftAlt || 'Devices & Mockups'}
              fill
              sizes="(max-width: 1024px) 100vw, 58.33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </Link>

          {/* Right: Smartphone Design Projects (Width 2012 / 4800 ~ 42%) */}
          <Link
            href={home.splitShowcase?.rightLink || '/works?category=BRANDING'}
            className="lg:col-span-5 group relative block aspect-[2012/1437] w-full overflow-hidden rounded-none bg-neutral-950"
          >
            <Image
              src={home.splitShowcase?.rightImage || '/extracted_assets/home/home_split_mobile.webp'}
              alt={home.splitShowcase?.rightAlt || 'R Design Mobile Projects'}
              fill
              sizes="(max-width: 1024px) 100vw, 41.67vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BRANDS I'VE WORKED WITH (Classic Full-Bleed Infinite Ticker)
          Full-bleed marquee ticker with zero side padding
          ========================================================================= */}
      <section className="w-full py-16 sm:py-20 bg-black overflow-hidden border-t border-neutral-900/80">
        <div className="w-full mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-horas text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-wider text-white"
          >
            {brandsTicker?.title || 'BRANDS I’VE WORKED WITH'}
          </motion.h2>
        </div>

        {/* Seamless Double-Strip Infinite Marquee */}
        <div className="relative w-full overflow-hidden select-none py-2">
          <div className="animate-marquee flex items-center">
            {/* Strip 1 */}
            <div className="flex-shrink-0 h-28 sm:h-36 md:h-44 w-auto flex items-center">
              <img
                src={brandsTicker?.image || '/extracted_assets/home/home_brands_ticker.webp'}
                alt="Client Brands"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
            {/* Strip 2 */}
            <div className="flex-shrink-0 h-28 sm:h-36 md:h-44 w-auto flex items-center" aria-hidden="true">
              <img
                src={brandsTicker?.image || '/extracted_assets/home/home_brands_ticker.webp'}
                alt="Client Brands"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ULTRA-SMOOTH FULL CINEMATIC ZOOM PORTAL DIVE
          Scroll-driven: backdrop pulls in, text dissolves, works hero rises,
          then instant route push to /works with zero blank flash.
          ========================================================================= */}
      <section
        id="zoom-section"
        ref={galaxyContainerRef}
        className="relative w-full h-[300vh] bg-black p-0 m-0 border-t border-neutral-900/80"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* ── LAYER 0: Cinematic Backdrop (scales to full bleed) ──────────── */}
          <motion.div
            style={{
              scale: backdropScale,
              filter: backdropFilter,
            }}
            className="absolute inset-0 z-0 will-change-transform"
          >
            <Image
              src={zoomSection?.backdropImage || '/extracted_assets/home/plain_portal_bg.webp'}
              alt="Cinematic Portal Backdrop"
              fill
              sizes="100vw"
              className="object-cover object-center select-none"
              quality={95}
              priority
            />
            <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black z-1" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 z-1" />
          </motion.div>

          {/* ── LAYER 1: "ZOOM INTO THE EXTRAORDINARY" text ─────────────────── */}
          <motion.div
            style={{
              opacity: textOpacity,
              scale: textScale,
              transformOrigin: 'center center',
            }}
            className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center will-change-transform select-none pointer-events-none"
          >
            <div className="flex flex-col items-center text-center">
              {/* ZOOM — golden "O" with void hole */}
              <div className="font-horas text-6xl sm:text-8xl md:text-9xl lg:text-[148px] uppercase font-bold tracking-tight text-white leading-[0.88] drop-shadow-[0_10px_40px_rgba(0,0,0,0.98)] flex items-center justify-center">
                <span>Z</span>
                <span className="relative inline-flex items-center justify-center text-[#fec52d]">
                  O
                  <span className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-black shadow-inner" />
                </span>
                <span>O</span>
                <span>M</span>
              </div>
              <div className="font-horas text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.25em] text-neutral-300 font-semibold mt-2 sm:mt-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                {zoomSection?.word2 || 'INTO THE'}
              </div>
              <div className="font-horas text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white font-bold mt-1 sm:mt-2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                {zoomSection?.word3 || 'EXTRAORDINARY'}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div style={{ opacity: ctaOpacity }} className="mt-8 sm:mt-10 pointer-events-auto">
              <Link
                href={zoomSection?.cta?.href || '/works'}
                className="px-9 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white hover:bg-[#fec52d] hover:text-black hover:scale-105 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl flex items-center gap-3 group"
              >
                <span>{zoomSection?.cta?.label || 'Explore Selected Works'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── LAYER 2: Works Hero full-bleed crossfade ─────────────────────── */}
          <motion.div
            style={{ opacity: worksOpacity, scale: worksScale }}
            className="absolute inset-0 z-20 will-change-transform overflow-hidden"
          >
            {/* Works background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={content.works?.backgroundImage || '/extracted_assets/work/work_hero_bg_clean.webp'}
                alt="Works Background"
                fill
                sizes="100vw"
                className="object-cover object-center select-none"
                quality={95}
                priority
              />
              <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 z-1" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70 z-1" />
            </div>

            {/* Works hero content */}
            <motion.div
              style={{ y: worksContentY }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="text-center px-6 max-w-4xl flex flex-col items-center">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">
                  {content.works?.heroTag || '// PORTFOLIO ARCHIVE'}
                </p>
                <h1 className="font-horas text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                  {content.works?.title || 'SELECTED ARCHIVE'}
                </h1>
                <p className="mt-4 font-ppmori text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
                  {content.works?.subtitle ||
                    'Bespoke film poster key art, character visuals, and cinematic advertising campaigns.'}
                </p>
                <div
                  onClick={() => { if (!navigating) { setNavigating(true); router.push('/works'); } }}
                  className="cursor-pointer mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#fec52d] text-black font-semibold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                >
                  <span>View Works Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
