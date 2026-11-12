'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles, Award, Film, Layers, Compass, ArrowDown } from 'lucide-react';

const stats = [
  { number: '14+', label: 'Years of Craft', desc: 'Continuous excellence in high-impact visual design' },
  { number: '180+', label: 'Key Visuals & Posters', desc: 'Theatrical, streaming & international festival releases' },
  { number: '45+', label: 'Industry Accolades', desc: 'Recognized by directors, studios & design juries' },
  { number: '100%', label: 'Bespoke Atelier Approach', desc: 'Zero generic templates; every piece is sculpted from scratch' },
];

const pillars = [
  {
    step: '01',
    title: 'Narrative Deconstruction',
    tag: 'CONCEPT // ANALYSIS',
    desc: 'Before touching a single pixel, we dissect the script, thematic core, and psychological pulse of the film. We isolate the single indelible hook that will intrigue the audience in a split second.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Visual Architecture & Typography',
    tag: 'LAYOUT // GEOMETRY',
    desc: 'We construct balance, scale, and uncompromising architectural typography. Every title design is custom-kerned and weighted to anchor the artwork with monumental gravitas.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Atmospheric Alchemy & Color',
    tag: 'LIGHTING // COMPOSITING',
    desc: 'Through photorealistic composite engineering, high-dynamic-range color grading, and meticulous textural depth, we infuse the canvas with the emotional atmosphere of the film.',
    icon: Film,
  },
  {
    step: '04',
    title: 'Global Master Key Art',
    tag: 'EXECUTION // SCALE',
    desc: 'Delivering immaculate master files calibrated for high-resolution IMAX billboards, theatrical banners, social media viral assets, and collector vinyl art.',
    icon: Award,
  },
];

const disciplines = [
  {
    title: 'Theatrical Film Posters',
    category: 'CINEMATIC KEY ART',
    desc: 'High-concept teaser posters, character one-sheets, and final theatrical master visuals that define a film’s legacy.',
    image: '/extracted_assets/work/work_card_1.webp',
  },
  {
    title: 'Brand Systems & Identities',
    category: 'VISUAL ARCHITECTURE',
    desc: 'Comprehensive visual identities for directors, production houses, premium brands, and luxury creative ventures.',
    image: '/extracted_assets/work/work_card_2.webp',
  },
  {
    title: 'Social & Digital Key Art',
    category: 'VIRAL ENGAGEMENT',
    desc: 'Engineered for instant thumb-stopping impact across digital landscapes without sacrificing editorial nuance.',
    image: '/extracted_assets/work/work_card_4.webp',
  },
  {
    title: 'Print, Ads & Packaging',
    category: 'PHYSICAL ARTIFACTS',
    desc: 'Tactile, high-finish physical collateral, limited vinyl pressings, and monumental outdoor advertising.',
    image: '/extracted_assets/work/work_card_5.webp',
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  // Hero parallax transforms
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroBgScale = useTransform(heroProgress, [0, 1], [1, 1.25]);
  const heroBgOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.25]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 120]);

  // Manifesto parallax transforms
  const { scrollYProgress: manifestoProgress } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  });

  const manifestoGlowScale = useTransform(manifestoProgress, [0, 0.5, 1], [0.8, 1.3, 0.9]);

  const scrollToNext = () => {
    manifestoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white font-ppmori selection:bg-[#fec52d] selection:text-black p-0 m-0"
    >
      {/* =========================================================================
          HERO SECTION: Majestic Scroll-Driven Parallax
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center overflow-hidden pt-32 pb-12 padding-primary"
      >
        {/* Parallax Background Layer */}
        <motion.div
          style={{ scale: heroBgScale, opacity: heroBgOpacity }}
          className="absolute inset-0 z-0 origin-center pointer-events-none"
        >
          <Image
            src="/extracted_assets/work/work_01_Matte_black_and_gold_abstract_eyes.webp"
            alt="Cinematic abstract art background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
            quality={92}
          />
          {/* Deep Vignette & Dark Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-1" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black z-1" />
        </motion.div>

        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#fec52d]/10 rounded-full blur-[140px] z-1" />

        {/* Top spacer */}
        <div className="h-4" />

        {/* Main Hero Content */}
        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#fec52d] text-xs font-mono uppercase tracking-[0.25em] backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>MUTHU ATELIER // THE VISION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-horas text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-black tracking-tight leading-[0.9] text-white drop-shadow-2xl"
          >
            WHERE VISION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fec52d] to-[#fce39d]">
              BECOMES ICONIC.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-neutral-300 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-light"
          >
            We are an independent creative design studio specializing in cinematic key art, theatrical film posters, and high-impact visual identities. We sculpt images that linger in memory long after the credits roll.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="relative z-10 flex flex-col items-center pt-6">
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-[#fec52d] transition-colors cursor-pointer"
            aria-label="Scroll to manifesto"
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.25em]">
              Explore Our Manifesto
            </span>
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#fec52d] transition-colors animate-bounce">
              <ArrowDown className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>

      {/* =========================================================================
          THE MANIFESTO: Pinned Typography & Editorial Statements
          ========================================================================= */}
      <section
        ref={manifestoRef}
        className="relative w-full py-28 md:py-36 bg-black border-t border-neutral-900 overflow-hidden"
      >
        <motion.div
          style={{ scale: manifestoGlowScale }}
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#fec52d]/5 rounded-full blur-[160px]"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Big Lead Quote (7 cols) */}
            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">
                // STUDIO PHILOSOPHY
              </p>
              <h2 className="font-horas text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight mb-8">
                &ldquo;WE DO NOT JUST DESIGN POSTERS. WE FORGE THE FIRST EMBLEM OF A FILM&apos;S SOUL.&rdquo;
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-6 font-light">
                In an era overwhelmed by disposable digital content, a film poster is a sanctuary of deliberate intent. It represents the singular collision of photography, bespoke typography, storytelling, and high art.
              </p>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-light">
                Every project undertaken at Muthu begins with deep contemplation: What is the emotional core? What question must the visual ask that only the cinema screen can answer?
              </p>
            </div>

            {/* Right DNA Points (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-neutral-950/80 border border-white/10 backdrop-blur-md hover:border-[#fec52d]/40 transition-colors">
                <span className="text-xs font-mono text-[#fec52d] tracking-widest uppercase block mb-2">
                  01 // INTENTIONAL CRAFT
                </span>
                <h3 className="font-horas text-2xl uppercase tracking-wider text-white mb-2">
                  Architectural Precision
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Nothing exists by accident. Every angle, letterform, and shadow is calculated to demand undivided attention.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-950/80 border border-white/10 backdrop-blur-md hover:border-[#fec52d]/40 transition-colors">
                <span className="text-xs font-mono text-[#fec52d] tracking-widest uppercase block mb-2">
                  02 // EMOTIVE GRAVITAS
                </span>
                <h3 className="font-horas text-2xl uppercase tracking-wider text-white mb-2">
                  Cinematic Alchemy
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Merging light, shade, and tension to elicit curiosity and anticipation before the teaser even plays.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-950/80 border border-white/10 backdrop-blur-md hover:border-[#fec52d]/40 transition-colors">
                <span className="text-xs font-mono text-[#fec52d] tracking-widest uppercase block mb-2">
                  03 // UNCOMPROMISING FIDELITY
                </span>
                <h3 className="font-horas text-2xl uppercase tracking-wider text-white mb-2">
                  Enduring Legacy
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Visuals sculpted to withstand the test of decades, proudly framed in collector archives across the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          IMPACT BY NUMBERS: Metric Cards with Hover Glow
          ========================================================================= */}
      <section className="relative w-full py-24 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-black border border-white/10 hover:border-[#fec52d]/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fec52d]/5 rounded-full blur-xl group-hover:bg-[#fec52d]/15 transition-colors pointer-events-none" />
                <span className="font-horas text-5xl sm:text-6xl text-[#fec52d] font-bold block mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {item.number}
                </span>
                <h4 className="font-horas text-lg uppercase tracking-wider text-white mb-2">
                  {item.label}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE CREATIVE ODYSSEY: 4-Step Process Timeline
          ========================================================================= */}
      <section className="relative w-full py-28 md:py-36 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] block mb-3">
              // METHODOLOGY &amp; CRAFT
            </span>
            <h2 className="font-horas text-4xl sm:text-6xl uppercase tracking-tight text-white mb-6">
              THE CREATIVE ODYSSEY
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
              How a cinematic idea travels from raw narrative premise to global theatrical key visual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="p-8 sm:p-10 rounded-3xl bg-neutral-950/80 border border-white/10 hover:border-[#fec52d]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-horas text-4xl font-bold text-[#fec52d]">
                      {pillar.step}
                    </span>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-horas text-2xl sm:text-3xl uppercase tracking-tight text-white mb-4 group-hover:text-[#fec52d] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-neutral-500 text-xs font-mono uppercase">
                  <span>Muthu Execution Standard</span>
                  <pillar.icon className="w-4 h-4 text-[#fec52d]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY DISCIPLINES & EXPERTISE: Visual Showcases
          ========================================================================= */}
      <section className="relative w-full py-28 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] block mb-3">
                // ATELIER CAPABILITIES
              </span>
              <h2 className="font-horas text-4xl sm:text-6xl uppercase tracking-tight text-white">
                SIGNATURE DISCIPLINES
              </h2>
            </div>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-[#fec52d] transition-colors"
            >
              <span>Explore Selected Works</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-3xl overflow-hidden bg-black border border-white/10 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="p-6 relative z-10 -mt-16 bg-gradient-to-t from-black via-black/90 to-transparent flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#fec52d] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-horas text-xl uppercase tracking-wider text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION: Majestic Full Bleed Finale
          ========================================================================= */}
      <section className="relative w-full py-32 md:py-40 bg-black border-t border-neutral-900 text-center overflow-hidden">
        {/* Ambient Gold Nebula */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#fec52d]/10 rounded-full blur-[160px]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">
            INITIATE COLLABORATION
          </span>

          <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black tracking-tight text-white leading-none mb-8">
            HAVE A VISION THAT DEMANDS TO BE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fec52d] to-[#fce39d]">
              UNFORGETTABLE?
            </span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl font-light mb-10 leading-relaxed">
            Let us craft key visuals that capture hearts, drive conversation, and define your creative narrative.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-[#fec52d] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(254,197,45,0.4)] flex items-center gap-2"
            >
              <span>Initiate Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/works"
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
            >
              View Selected Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
