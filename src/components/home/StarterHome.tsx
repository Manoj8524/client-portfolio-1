'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteContent, HeroPosterItem } from '@/lib/contentStore';
import defaultContent from '@/data/siteContent.json';

interface StarterHomeProps {
  initialData?: SiteContent;
}

// ─── PortalCircle: crisp SVG circle clip-path expands to reveal Works Hero ───
interface PortalCircleProps {
  progress: MotionValue<number>;      // 0 → 210 (percentage of viewport diagonal)
  backgroundImage: string;
  heroTag: string;
  title: string;
  subtitle: string;
  revealOpacity: MotionValue<number>;
  revealContentY: MotionValue<number>;
}

function PortalCircle({
  progress,
  backgroundImage,
  heroTag,
  title,
  subtitle,
  revealOpacity,
  revealContentY,
}: PortalCircleProps) {
  const [clipValue, setClipValue] = React.useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    setClipValue(v);
  });

  // Build clip-path: circle grows from center
  // At 0% → tiny dot; at 210% → covers full viewport
  const clipPath = `circle(${clipValue}% at 50% 50%)`;

  return (
    <div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      {/* Golden ring border – visible at small circle sizes */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'transparent',
          boxShadow: `inset 0 0 0 ${Math.max(0, 6 - clipValue * 0.05)}px #fec52d`,
        }}
      />

      {/* Works Hero background image fills the circle */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Works Background"
          fill
          sizes="100vw"
          className="object-cover object-center select-none"
          quality={92}
          priority
        />
        <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/85 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-1" />
      </div>

      {/* Works Hero typography rises into view */}
      <motion.div
        style={{ opacity: revealOpacity, y: revealContentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">{heroTag}</p>
        <h1 className="font-horas text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          {title}
        </h1>
        <p className="mt-4 font-ppmori text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
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

  // Galaxy Zoom pinned portal dive into the "O" straight into the Works Hero
  const { scrollYProgress: galaxyProgress } = useScroll({
    target: galaxyContainerRef,
    offset: ['start start', 'end end'],
  });

  // Portal circle clip-path: starts tiny (0%) grows to cover full screen (200%)
  const portalSize = useTransform(galaxyProgress, [0.05, 0.88], [0, 210]);
  const galaxyBackdropScale = useTransform(galaxyProgress, [0, 1], [1, 1.12]);

  // Text + CTA fade out as portal opens
  const galaxyCtaOpacity = useTransform(galaxyProgress, [0, 0.18], [1, 0]);
  const galaxyCtaY = useTransform(galaxyProgress, [0, 0.18], [0, 24]);
  const textBlockOpacity = useTransform(galaxyProgress, [0, 0.22], [1, 0]);

  // Works Hero reveal: fades + rises smoothly through the portal
  const worksRevealOpacity = useTransform(galaxyProgress, [0.65, 0.90], [0, 1]);
  const worksRevealScale = useTransform(galaxyProgress, [0.65, 0.92], [0.90, 1]);
  const worksRevealContentY = useTransform(galaxyProgress, [0.70, 0.92], [32, 0]);

  // When user reaches end of the dive (>= 0.93 progress), smoothly transition route to /works
  useEffect(() => {
    // Prefetch /works for instant route navigation
    router.prefetch('/works');

    const unsubscribe = galaxyProgress.on('change', (latest) => {
      if (latest >= 0.93 && !navigating) {
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
          SECTION 6: CINEMATIC PORTAL DIVE — scroll-driven circle clip-path
          A crisp golden circle grows from center to fill the full screen,
          revealing the Works Hero page underneath — zero font pixelation.
          ========================================================================= */}
      <section
        ref={galaxyContainerRef}
        className="relative w-full h-[260vh] bg-black p-0 m-0 border-t border-neutral-900/80"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">

          {/* ── LAYER 0: Cinematic backdrop (gently parallax) ── */}
          <motion.div
            style={{ scale: galaxyBackdropScale }}
            className="absolute inset-0 z-0 select-none pointer-events-none will-change-transform"
          >
            <Image
              src={zoomSection?.backdropImage || '/extracted_assets/home/plain_portal_bg.webp'}
              alt="Cinematic Portal Backdrop"
              fill
              sizes="100vw"
              className="object-cover object-center select-none"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-1" />
          </motion.div>

          {/* ── LAYER 1: Static typography — fades out before portal opens ── */}
          <motion.div
            style={{ opacity: textBlockOpacity }}
            className="relative z-10 flex flex-col items-center text-center select-none pointer-events-none px-6"
          >
            {/* Tag line */}
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-6 opacity-80">
              {zoomSection?.word2 || '// SCROLL TO ENTER'}
            </p>

            {/* Large headline */}
            <h2 className="font-horas text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase font-bold tracking-tight text-white leading-[0.88] drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
              {zoomSection?.word1 || 'ENTER THE'}
            </h2>
            <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl lg:text-[100px] uppercase font-bold tracking-widest text-[#fec52d] leading-[0.88] mt-2 drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
              {zoomSection?.word3 || 'ARCHIVE'}
            </h2>

            {/* Sub line */}
            <p className="mt-6 font-ppmori text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed">
              {zoomSection?.word2 || 'Scroll to dive into selected works'}
            </p>
          </motion.div>

          {/* ── LAYER 2: CTA Button — fades with text ── */}
          <motion.div
            style={{ opacity: galaxyCtaOpacity, y: galaxyCtaY }}
            className="absolute bottom-12 z-10 pointer-events-auto"
          >
            <Link
              href={zoomSection?.cta?.href || '/works'}
              className="px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white hover:bg-[#fec52d] hover:text-black font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl flex items-center gap-3 group"
            >
              <span>{zoomSection?.cta?.label || 'Explore Selected Works'}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>

          {/* ── LAYER 3: Golden portal circle that grows via clip-path ── */}
          <PortalCircle
            progress={portalSize}
            backgroundImage={content.works?.backgroundImage || '/extracted_assets/work/work_hero_bg_clean.webp'}
            heroTag={content.works?.heroTag || '// PORTFOLIO ARCHIVE'}
            title={content.works?.title || 'SELECTED ARCHIVE'}
            subtitle={content.works?.subtitle || 'Bespoke film poster key art, character visuals, and cinematic advertising campaigns.'}
            revealOpacity={worksRevealOpacity}
            revealContentY={worksRevealContentY}
          />
        </div>
      </section>
    </div>
  );
}
