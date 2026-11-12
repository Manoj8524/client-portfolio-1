'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  heroColumn1,
  heroColumn2,
  heroColumn3,
  heroColumn4,
  heroColumn5,
  HeroPosterItem,
} from '@/data/heroPosters';

interface StarterHomeProps {
  services?: any[];
  featuredPosters?: any[];
  clients?: any[];
}

export default function StarterHome({}: StarterHomeProps) {
  const watchRef = useRef<HTMLDivElement>(null);
  const galaxyContainerRef = useRef<HTMLDivElement>(null);

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
    // Duplicate posters array for seamless infinite vertical marquee
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
                alt={poster.title}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover object-center group-hover/poster:scale-105 transition-transform duration-700 ease-out select-none"
                priority={idx < 4}
                loading={idx < 4 ? undefined : 'lazy'}
                quality={85}
              />
              {/* Subtle dark film sheen with hover brighten */}
              <div className="absolute inset-0 bg-black/15 group-hover/poster:bg-black/0 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-black text-white font-ppmori overflow-x-hidden p-0 m-0 selection:bg-[#fec52d] selection:text-black">
      {/* =========================================================================
          SECTION 1: HERO - DYNAMIC 5-COLUMN CONTINUOUS VERTICAL POSTER MATRIX
          All 5 columns continuously scroll upward with differential speeds.
          Column 5 (right) at base speed -> Column 1 (left) at fastest speed.
          ========================================================================= */}
      <section
        className="relative w-full h-screen flex flex-col justify-between items-center overflow-hidden pt-20 p-0 m-0 bg-black"
      >
        {/* Dynamic 5-Column Vertical Scrolling Film Poster Matrix */}
        <div className="absolute inset-0 z-0 flex gap-2.5 sm:gap-3.5 md:gap-5 px-2 sm:px-4 md:px-6 overflow-hidden">
          {renderColumn(heroColumn1, 'animate-scroll-lane-1')}
          {renderColumn(heroColumn2, 'animate-scroll-lane-2')}
          {renderColumn(heroColumn3, 'animate-scroll-lane-3')}
          {renderColumn(heroColumn4, 'animate-scroll-lane-4')}
          {renderColumn(heroColumn5, 'animate-scroll-lane-5')}
        </div>

        {/* Ambient Top & Bottom Vignettes for Contrast and Depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/60 to-transparent z-1" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent z-1" />
        <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 z-1" />

        {/* Top spacer */}
        <div className="h-10" />

        {/* Flexible center space */}
        <div className="flex-1" />

        {/* Center Bottom: Scroll Down Indicator */}
        <div className="relative z-10 pb-8 flex flex-col items-center">
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-2 text-neutral-300 hover:text-[#fec52d] transition-colors cursor-pointer"
            aria-label="Scroll to featured works"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Scroll To Discover
            </span>
            <div className="w-8 h-8 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center group-hover:border-[#fec52d] transition-colors animate-bounce shadow-xl">
              <ArrowDown className="w-3.5 h-3.5 text-white group-hover:text-[#fec52d]" />
            </div>
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 3-COLUMN SHOWCASE CARDS (Cloned from 01.psb)
          ZERO GAP, ZERO PADDING, FULL BLEED EDGE-TO-EDGE
          ========================================================================= */}
      <section
        id="featured-showcase"
        className="w-full p-0 m-0 bg-black border-t border-neutral-900/80"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 p-0 m-0">
          {/* Card 1: Orange Mechanical Device */}
          <Link
            href="/works?category=BRANDING"
            className="group relative aspect-[1600/2012] w-full block overflow-hidden rounded-none border-b border-neutral-900/80 md:border-b-0 md:border-r border-neutral-900/80 bg-neutral-950"
          >
            <Image
              src="/extracted_assets/home/home_showcase_1.webp"
              alt="Brand, website design, Development"
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

          {/* Card 2: Outdoor Boxes Packaging */}
          <Link
            href="/works?category=PRINT+%26+ADS"
            className="group relative aspect-[1600/2012] w-full block overflow-hidden rounded-none border-b border-neutral-900/80 md:border-b-0 md:border-r border-neutral-900/80 bg-neutral-950"
          >
            <Image
              src="/extracted_assets/home/home_showcase_2.webp"
              alt="Held by Hands Outdoor Boxes Packaging"
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

          {/* Card 3: Modern Architectural Model */}
          <Link
            href="/works?category=SOCIAL+MEDIA+CREATIVES"
            className="group relative aspect-[1600/2012] w-full block overflow-hidden rounded-none bg-neutral-950"
          >
            <Image
              src="/extracted_assets/home/home_showcase_3.webp"
              alt="A&G Studio Art Direction"
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SOTTO ZERO SMARTWATCH PRODUCT BANNER (Cloned from 01.psb)
          ZERO GAP, FULL BLEED, MATTE BLACK PRODUCT SHOWCASE
          ========================================================================= */}
      <section
        ref={watchRef}
        className="relative w-full aspect-[4800/1476] min-h-[380px] sm:min-h-[460px] md:min-h-[560px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-t border-neutral-900/80 p-0 m-0 bg-neutral-950"
      >
        <motion.div
          style={{ scale: watchScale }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/extracted_assets/home/home_featured_watch.webp"
            alt="Sotto Zero Smartwatch Product Direction"
            fill
            sizes="100vw"
            className="object-cover object-center select-none"
            quality={92}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-1" />
        </motion.div>

        {/* Interactive Corner Hotspot */}
        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-[0.2em] text-[#fec52d] mb-3">
            <span>Featured Product</span>
          </div>
          <h3 className="font-horas text-2xl sm:text-4xl uppercase tracking-tight text-white mb-2">
            Sotto Zero
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xs">
            Industrial hardware identity and digital experience interface.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 50/50 SPLIT VIEW (LAPTOP & MOBILE MOCKUPS) (Cloned from 01.psb)
          ZERO GAP, FULL BLEED EDGE-TO-EDGE
          ========================================================================= */}
      <section className="w-full p-0 m-0 bg-black border-t border-neutral-900/80">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 p-0 m-0">
          {/* Left 50%: Responsive Laptop Showcase */}
          <div className="relative aspect-[2788/1437] min-h-[340px] sm:min-h-[420px] w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-900/80 bg-neutral-950">
            <Image
              src="/extracted_assets/home/home_split_laptop.webp"
              alt="Desktop Digital Experience Showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                01 // Desktop Architecture
              </span>
            </div>
          </div>

          {/* Right 50%: Responsive Mobile Showcase */}
          <div className="relative aspect-[2788/1437] min-h-[340px] sm:min-h-[420px] w-full overflow-hidden bg-neutral-950">
            <Image
              src="/extracted_assets/home/home_split_mobile.webp"
              alt="Mobile Interface & Social Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                02 // Mobile Touch Experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BRANDS I'VE WORKED WITH (CONTINUOUS MARQUEE TICKER)
          ========================================================================= */}
      <section className="w-full py-12 sm:py-16 bg-black border-t border-neutral-900/80 overflow-hidden">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-500">
            // Trusted By Premier Studios &amp; Visionary Brands
          </p>
        </div>

        {/* Seamless Double-Strip Infinite Marquee (Restored from 01.psb) */}
        <div className="relative w-full overflow-hidden select-none py-2">
          {/* Edge gradient fades for luxury editorial feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="animate-marquee flex items-center">
            {/* Strip 1 */}
            <div className="flex-shrink-0 h-20 sm:h-28 md:h-36 w-auto flex items-center pr-12">
              <img
                src="/extracted_assets/home/home_brands_ticker.webp"
                alt="Partner Brands and Production Houses"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
            {/* Strip 2 */}
            <div className="flex-shrink-0 h-20 sm:h-28 md:h-36 w-auto flex items-center pr-12" aria-hidden="true">
              <img
                src="/extracted_assets/home/home_brands_ticker.webp"
                alt="Partner Brands and Production Houses"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ZOOM INTO THE "O" CINEMATIC DIVE SECTION
          Scroll-driven zoom directly into the letter "O", diving cleanly
          straight into the Footer with zero black screen lingering.
          ========================================================================= */}
      <section
        ref={galaxyContainerRef}
        className="relative w-full h-[175vh] bg-black p-0 m-0 border-t border-neutral-900/80"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          {/* Plain Luxury Cinematic Dark Background (No baked-in text or clutter) */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/extracted_assets/home/plain_portal_bg.webp"
              alt="Cinematic Portal Backdrop"
              fill
              sizes="100vw"
              className="object-cover object-center select-none opacity-90"
              quality={90}
            />
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black z-1" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-1" />
          </div>

          {/* Zooming Typography centered precisely on the golden "O" */}
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
                {/* The Portal O with distinct circular center */}
                <span className="relative inline-flex items-center justify-center text-[#fec52d]">
                  O
                  <span className="absolute w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-black shadow-inner" />
                </span>
                <span>O</span>
                <span>M</span>
              </div>

              {/* Line 2: INTO THE */}
              <div className="font-horas text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.25em] text-neutral-300 font-semibold mt-2 sm:mt-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                INTO THE
              </div>

              {/* Line 3: EXTRAORDINARY */}
              <div className="font-horas text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-white font-bold mt-1 sm:mt-2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
                EXTRAORDINARY
              </div>
            </div>

            {/* Elegant Callout CTA Button - Fades out smoothly as user scrolls into the dive */}
            <motion.div
              style={{
                opacity: galaxyCtaOpacity,
                y: galaxyCtaY,
              }}
              className="mt-8 sm:mt-10 pointer-events-auto"
            >
              <Link
                href="/contact"
                className="px-9 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white hover:bg-[#fec52d] hover:text-black hover:scale-105 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl flex items-center gap-3 group"
              >
                <span>Initiate Collaboration</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
