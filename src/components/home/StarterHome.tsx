'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface StarterHomeProps {
  services?: any[];
  featuredPosters?: any[];
  clients?: any[];
}

export default function StarterHome({}: StarterHomeProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);

  // Hero scroll parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.4]);

  // Featured watch scroll parallax
  const { scrollYProgress: watchProgress } = useScroll({
    target: watchRef,
    offset: ['start end', 'end start'],
  });
  const watchScale = useTransform(watchProgress, [0, 0.5, 1], [0.98, 1.02, 0.99]);

  // Galaxy zoom scroll effect
  const { scrollYProgress: galaxyProgress } = useScroll({
    target: galaxyRef,
    offset: ['start end', 'end start'],
  });
  const galaxyZoom = useTransform(galaxyProgress, [0, 0.5, 1], [1, 1.15, 1.25]);

  const scrollToNext = () => {
    const el = document.getElementById('featured-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-black text-white font-ppmori overflow-x-hidden p-0 m-0 selection:bg-[#fec52d] selection:text-black">
      {/* =========================================================================
          SECTION 1: HERO - MOVIE POSTERS WALL SHOWCASE (Cloned from 01.psb)
          Full-bleed edge-to-edge wall with subtle parallax motion
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden pt-20 p-0 m-0"
      >
        {/* Parallax Background Poster Wall */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/extracted_assets/home/home_hero_wall.webp"
            alt="Muthu Film Posters Showcase"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top select-none"
            quality={92}
          />
          {/* Subtle vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/60 z-1" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 z-1" />
        </motion.div>

        {/* Top spacer */}
        <div className="h-10" />

        {/* Clean Hero View matching 01.psb full poster wall */}
        <div className="flex-1" />

        {/* Scroll Down Indicator */}
        <div className="relative z-10 pb-8 flex flex-col items-center">
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-[#fec52d] transition-colors cursor-pointer"
            aria-label="Scroll to featured works"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.25em]">
              Scroll To Discover
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#fec52d] transition-colors animate-bounce">
              <ArrowDown className="w-3.5 h-3.5" />
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

          {/* Card 3: Dior Luxury Cosmetic Bottles Pour */}
          <Link
            href="/works?category=BRANDING"
            className="group relative aspect-[1600/2012] w-full block overflow-hidden rounded-none bg-neutral-950"
          >
            <Image
              src="/extracted_assets/home/home_showcase_3.webp"
              alt="DIOR Brand, Packaging, Development"
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
          SECTION 3: WIDE FEATURED PROJECT (Cloned from 01.psb)
          ZERO GAP WITH SECTION 2, FULL BLEED EDGE-TO-EDGE
          ========================================================================= */}
      <section
        ref={watchRef}
        className="w-full p-0 m-0 bg-black overflow-hidden border-t border-neutral-900/80"
      >
        <Link
          href="/works?category=PRINT+%26+ADS"
          className="group relative block aspect-[4800/1983] w-full overflow-hidden rounded-none bg-neutral-950 cursor-pointer"
        >
          <motion.div style={{ scale: watchScale }} className="relative w-full h-full will-change-transform">
            <Image
              src="/extracted_assets/home/home_featured_watch.webp"
              alt="sotto zero Smartwatch - Brand, website Strategy, Development"
              fill
              sizes="100vw"
              className="object-cover object-center select-none group-hover:scale-105 transition-transform duration-1000 ease-out"
              quality={92}
            />
          </motion.div>
        </Link>
      </section>

      {/* =========================================================================
          SECTION 4: SPLIT 2-COLUMN SHOWCASE (Cloned from 01.psb)
          ZERO GAP, FULL BLEED EDGE-TO-EDGE
          ========================================================================= */}
      <section className="w-full p-0 m-0 bg-black border-t border-neutral-900/80">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 p-0 m-0">
          {/* Left: Laptop Mockup (Width 2788 / 4800 ~ 58%) */}
          <Link
            href="/works?category=PRINT+%26+ADS"
            className="lg:col-span-7 group relative block aspect-[2788/1437] w-full overflow-hidden rounded-none border-b lg:border-b-0 lg:border-r border-neutral-900/80 bg-neutral-950"
          >
            <Image
              src="/extracted_assets/home/home_split_laptop.webp"
              alt="Devices & Mockups"
              fill
              sizes="(max-width: 1024px) 100vw, 58.33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </Link>

          {/* Right: Smartphone Design Projects (Width 2012 / 4800 ~ 42%) */}
          <Link
            href="/works?category=BRANDING"
            className="lg:col-span-5 group relative block aspect-[2012/1437] w-full overflow-hidden rounded-none bg-neutral-950"
          >
            <Image
              src="/extracted_assets/home/home_split_mobile.webp"
              alt="R Design Mobile Projects"
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
          SECTION 5: BRANDS I'VE WORKED WITH (Cloned from 01.psb)
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
            BRANDS I’VE WORKED WITH
          </motion.h2>
        </div>

        {/* Seamless Double-Strip Infinite Marquee */}
        <div className="relative w-full overflow-hidden select-none py-2">
          <div className="animate-marquee flex items-center">
            {/* Strip 1 */}
            <div className="flex-shrink-0 h-28 sm:h-36 md:h-44 w-auto flex items-center">
              <img
                src="/extracted_assets/home/home_brands_ticker.webp"
                alt="Client Brands"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
            {/* Strip 2 */}
            <div className="flex-shrink-0 h-28 sm:h-36 md:h-44 w-auto flex items-center" aria-hidden="true">
              <img
                src="/extracted_assets/home/home_brands_ticker.webp"
                alt="Client Brands"
                className="h-full w-auto object-contain max-w-none opacity-85 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: COSMIC GALAXY "ZOOM INTO THE EXTRAORDINARY" (Cloned from 01.psb)
          Full-bleed edge-to-edge interactive scroll zoom parallax
          ========================================================================= */}
      <section
        ref={galaxyRef}
        className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden border-t border-neutral-900/80 p-0 m-0"
      >
        {/* Parallax Zoom Nebula Background */}
        <motion.div
          style={{ scale: galaxyZoom }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/extracted_assets/home/home_galaxy_zoom.webp"
            alt="Zoom Into The Extraordinary"
            fill
            sizes="100vw"
            className="object-cover object-center select-none"
            quality={92}
          />
          {/* Vignette overlays */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/80 z-1" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-1" />
        </motion.div>

        {/* Center Glowing Action */}
        <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Link
              href="/contact"
              className="mt-6 px-9 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white hover:bg-[#fec52d] hover:text-black hover:scale-105 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl flex items-center gap-3 group"
            >
              <span>Initiate Collaboration</span>
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
