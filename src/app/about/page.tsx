'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Award, Film, Layers, Compass } from 'lucide-react';
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
          HERO EDITORIAL BIO
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

          {/* Right: Portrait / Key Art Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group">
              <Image
                src={about?.profileImage || '/starter_assets/ZaApBaIfuKVadeqET6B3KEc3ZGI.png'}
                alt="Muthu"
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-1" />
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
                <div>
                  <p className="font-horas text-2xl uppercase tracking-wider text-white">
                    {siteSettings?.brandName || 'MUTHU'}
                  </p>
                  <p className="text-[11px] font-mono text-[#fec52d] uppercase tracking-widest">
                    KEY ART SPECIALIST
                  </p>
                </div>
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
              // EVOLUTION &amp; TIMELINE
            </p>
            <h2 className="font-horas text-4xl sm:text-6xl uppercase tracking-tighter text-white">
              The Journey of Vision
            </h2>
          </div>

          <div className="relative border-l border-neutral-800 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12">
            {about?.journeyMilestones?.map((milestone, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border-2 border-[#fec52d] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#fec52d]">
                  {milestone.year}
                </span>
                <h3 className="font-horas text-2xl sm:text-3xl uppercase tracking-wide text-white mt-1">
                  {milestone.title}
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  {milestone.role}
                </p>
                <p className="font-ppmori text-sm text-neutral-300 leading-relaxed mt-3 max-w-2xl">
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
