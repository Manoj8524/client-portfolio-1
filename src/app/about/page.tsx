'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  Award,
  Film,
  Layers,
  Compass,
  CheckCircle2,
  Palette,
  Eye,
  Camera,
  Flame,
} from 'lucide-react';
import initialContent from '@/data/siteContent.json';

export default function AboutPage() {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.about) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  const { about, siteSettings } = content;

  return (
    <div className="w-full bg-black text-white font-ppmori overflow-x-hidden p-0 m-0 selection:bg-[#fec52d] selection:text-black pt-24">
      {/* =========================================================================
          HERO EDITORIAL BIO + CREATIVE MANIFESTO CARD
          ========================================================================= */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 sm:px-10 md:px-16 py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#fec52d]/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Bio & Ethos */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-[#fec52d] text-xs font-mono uppercase tracking-[0.25em] w-max">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{about?.tag || '// CREATIVE BIOGRAPHY & ETHOS'}</span>
            </div>

            <h1 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white leading-[0.92]">
              {about?.headline || 'CRAFTING VISUAL LEGACIES FOR CINEMA & CULTURE.'}
            </h1>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed font-ppmori">
              {about?.storyParagraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-[#fec52d] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-[#ffe066] transition-all duration-300 shadow-xl flex items-center gap-2 group"
              >
                <span>Initiate Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Link>
              <Link
                href="/works"
                className="px-8 py-3.5 rounded-full bg-neutral-900 border border-neutral-800 text-white text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
              >
                View Archive
              </Link>
            </div>
          </div>

          {/* Right: Architectural Kinetic Studio Monolith Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-black border border-neutral-800/90 shadow-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[460px] group">
              {/* Decorative Subtle Grid Backdrop */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#fec52d]/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Top Row: Studio Index & Coordinates */}
              <div className="relative z-10 flex items-start justify-between border-b border-neutral-800/80 pb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                    // MONOLITH ARCHIVE
                  </span>
                  <h3 className="font-horas text-3xl sm:text-4xl uppercase tracking-tight text-white mt-1">
                    {siteSettings?.brandName || 'MUTHU'}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#fec52d]">
                  <Film className="w-5 h-5" />
                </div>
              </div>

              {/* Middle Section: Disciplines & Pillars */}
              <div className="relative z-10 py-6 space-y-4">
                <div className="flex items-center gap-3 text-neutral-300">
                  <div className="w-8 h-8 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center text-[#fec52d] flex-shrink-0">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-horas text-base sm:text-lg uppercase text-white tracking-wide">
                      Theatrical Key Art
                    </h4>
                    <p className="text-xs font-ppmori text-neutral-400">
                      Iconic first looks, character posters & festival releases
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-neutral-300">
                  <div className="w-8 h-8 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center text-[#fec52d] flex-shrink-0">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-horas text-base sm:text-lg uppercase text-white tracking-wide">
                      Cinematic Visual Identity
                    </h4>
                    <p className="text-xs font-ppmori text-neutral-400">
                      Bespoke typography, lighting aesthetics & atmospheric depth
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-neutral-300">
                  <div className="w-8 h-8 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center text-[#fec52d] flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-horas text-base sm:text-lg uppercase text-white tracking-wide">
                      Publicity Architecture
                    </h4>
                    <p className="text-xs font-ppmori text-neutral-400">
                      180+ master campaigns launched across Indian cinema
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Studio Status & Location Stamp */}
              <div className="relative z-10 pt-6 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#fec52d] animate-pulse" />
                  <span className="uppercase tracking-widest text-neutral-300">KOCHI / INDIA</span>
                </div>
                <span className="text-[#fec52d] uppercase tracking-wider">
                  EST. 2018
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY STATS NUMERICAL BAR
          ========================================================================= */}
      <section className="w-full py-16 bg-neutral-950 border-y border-neutral-900/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {about?.stats?.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-horas text-5xl sm:text-6xl md:text-7xl text-[#fec52d] leading-none">
                  {stat.value}
                </span>
                <span className="font-horas text-base sm:text-lg uppercase tracking-wide text-white">
                  {stat.label}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CAREER MILESTONES & JOURNEY
          ========================================================================= */}
      <section className="w-full py-24 sm:py-32 bg-black border-b border-neutral-900/80">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">
              // EVOLUTION & TIMELINE
            </p>
            <h2 className="font-horas text-4xl sm:text-6xl uppercase tracking-tighter text-white">
              The Creative Journey.
            </h2>
          </div>

          <div className="relative border-l border-neutral-800 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12">
            {about?.journeyMilestones?.map((milestone, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#fec52d] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#fec52d] block mb-2">
                  {milestone.year}
                </span>
                <h3 className="font-horas text-2xl sm:text-3xl uppercase tracking-wide text-white mb-1 group-hover:text-[#fec52d] transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  {milestone.role}
                </p>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl font-ppmori">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
