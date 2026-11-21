'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import initialContent from '@/data/siteContent.json';

function WorksContent() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category');
  const [content, setContent] = useState(initialContent);

  // Sync latest updates from content store on mount
  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.works) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  const { works } = content;
  const categories = works?.categories || [
    'ALL',
    'FILM POSTERS',
    'BRANDING',
    'SOCIAL MEDIA CREATIVES',
    'PRINT & ADS',
  ];

  const getInitialTab = (): string => {
    if (!rawCategory) return 'ALL';
    const normalized = rawCategory.toUpperCase().replace(/\+/g, ' ');
    const found = categories.find((c) => c.toUpperCase() === normalized);
    return found || 'ALL';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  useEffect(() => {
    if (rawCategory) {
      const normalized = rawCategory.toUpperCase().replace(/\+/g, ' ');
      const found = categories.find((c) => c.toUpperCase() === normalized);
      if (found) setActiveTab(found);
    }
  }, [rawCategory, categories]);

  const allProjects = works?.projects || [];

  const filteredItems = activeTab === 'ALL'
    ? allProjects
    : allProjects.filter((item) => item.category?.toUpperCase() === activeTab.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1.0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-black text-white font-ppmori overflow-x-hidden p-0 m-0 selection:bg-[#fec52d] selection:text-black pt-20"
    >
      {/* =========================================================================
          HERO BANNER: EDITABLE WORKS BANNER
          ========================================================================= */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden p-0 m-0">
        <div className="absolute inset-0 z-0">
          <Image
            src={works?.backgroundImage || '/extracted_assets/work/work_hero_bg_clean.webp'}
            alt="Works Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
            quality={92}
          />
          {/* Subtle top vignette only for header contrast - zero bottom black overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-1" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">
            {works?.heroTag || '// PORTFOLIO ARCHIVE'}
          </p>
          <h1 className="font-horas text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            {works?.title || 'SELECTED ARCHIVE'}
          </h1>
          <p className="mt-4 font-ppmori text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
            {works?.subtitle ||
              'Bespoke film poster key art, character visuals, and cinematic advertising campaigns.'}
          </p>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY NAVIGATION TABS
          ========================================================================= */}
      <section className="sticky top-20 z-30 w-full bg-black/90 backdrop-blur-xl border-y border-neutral-900/80 py-3 sm:py-4 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center w-full overflow-hidden">
          <nav className="flex items-center gap-2 sm:gap-6 md:gap-8 overflow-x-auto no-scrollbar py-1 px-1 sm:px-0 select-none scroll-smooth w-full sm:w-auto">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative text-xs sm:text-sm font-medium uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all duration-300 cursor-pointer py-1.5 px-3.5 sm:px-4 rounded-full whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-[#fec52d] font-semibold bg-neutral-900 border border-[#fec52d]/40 shadow-[0_0_12px_rgba(254,197,45,0.12)]'
                      : 'text-neutral-400 hover:text-[#fec52d] hover:bg-neutral-900/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* =========================================================================
          PORTFOLIO GRID: 3 Columns
          ========================================================================= */}
      <section id="work-grid" className="w-full p-0 m-0 bg-black">
        <motion.div
          layout
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 p-0 m-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="group relative w-full aspect-[1588/1985] overflow-hidden rounded-none border-b sm:border-r border-neutral-900/60 bg-neutral-950 block"
              >
                <div className="relative w-full h-full block overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                    quality={90}
                    loading={idx < 6 ? 'eager' : 'lazy'}
                    priority={idx < 4}
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="flex justify-end">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#fec52d]/40 text-[#fec52d] text-[11px] font-mono uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        {item.year && (
                          <p className="text-[11px] font-mono text-[#fec52d] tracking-widest uppercase mb-1">
                            {item.year} {item.client ? `// ${item.client}` : ''}
                          </p>
                        )}
                        <h3 className="font-horas text-xl sm:text-2xl uppercase tracking-wide text-white drop-shadow-md">
                          {item.title}
                        </h3>
                        {item.director && (
                          <p className="text-xs font-mono text-neutral-400 mt-0.5">
                            Director: {item.director}
                          </p>
                        )}
                        {item.awards && (
                          <p className="text-[11px] font-mono text-[#fec52d] mt-1">
                            ★ {item.awards}
                          </p>
                        )}
                      </div>

                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#fec52d] group-hover:text-black transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default function WorksPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-black text-white font-ppmori pt-20 flex flex-col items-center justify-center">
          <div className="text-center px-6">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#fec52d] mb-4">// PORTFOLIO ARCHIVE</p>
            <h1 className="font-horas text-5xl sm:text-7xl uppercase tracking-tighter text-white">SELECTED ARCHIVE</h1>
          </div>
        </div>
      }
    >
      <WorksContent />
    </Suspense>
  );
}
