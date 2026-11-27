'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { SiteContent, WorkProjectItem } from '@/lib/contentStore';
import { resolveCardRatio } from '@/lib/ratioUtils';
import initialContent from '@/data/siteContent.json';

function WorksContent() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category');
  const [content, setContent] = useState<SiteContent>(initialContent as unknown as SiteContent);

  // Sync latest updates from content store on mount
  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.works) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  const { works } = content;
  const categories = (works?.categories || [
    'BRANDING',
    'FILM POSTERS',
    'SOCIAL MEDIA CREATIVES',
    'PRINT & ADS',
  ]).filter((c) => c.toUpperCase() !== 'ALL');

  const getInitialTab = (): string => {
    if (!rawCategory) return categories[0] || 'BRANDING';
    const normalized = rawCategory.toUpperCase().replace(/\+/g, ' ');
    const found = categories.find((c) => c.toUpperCase() === normalized);
    return found || categories[0] || 'BRANDING';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  useEffect(() => {
    if (rawCategory) {
      const normalized = rawCategory.toUpperCase().replace(/\+/g, ' ');
      const found = categories.find((c) => c.toUpperCase() === normalized);
      if (found) setActiveTab(found);
    } else if (activeTab === 'ALL' && categories.length > 0) {
      setActiveTab(categories[0]);
    }
  }, [rawCategory, categories, activeTab]);

  const allProjects = works?.projects || [];
  const defaultGridRatio = works?.gridAspectRatio || '2/3';

  const filteredItems = allProjects.filter((item) => item.category?.toUpperCase() === activeTab.toUpperCase());

  return (
    <div
      className="w-full bg-black text-white font-ppmori overflow-x-hidden p-0 m-0 selection:bg-[#fec52d] selection:text-black pt-20"
    >
      {/* =========================================================================
          HERO BANNER: EDITABLE WORKS BANNER (Customizable Image & Height)
          ========================================================================= */}
      {(() => {
        const heightVal = works?.heroHeight ?? 65;
        const unit = works?.heroHeightUnit || 'vh';
        const heightStyle = unit === 'vh' ? `${heightVal}vh` : `${heightVal}px`;
        const hasBgImage = Boolean(works?.backgroundImage && works.backgroundImage.trim() !== '');

        return (
          <section
            id="works-hero-banner"
            style={{ minHeight: heightStyle, height: heightStyle }}
            className="relative w-full flex flex-col justify-between overflow-hidden p-0 m-0 transition-all duration-300"
          >
            {hasBgImage ? (
              <div className="absolute inset-0 z-0">
                <Image
                  src={works!.backgroundImage!}
                  alt="Works Background"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center select-none"
                  quality={92}
                  unoptimized={works!.backgroundImage!.startsWith('http')}
                />
                {/* Left-to-right dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10 z-1" />
                {/* Bottom vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-1"
                  style={{ opacity: works?.heroOverlayOpacity ?? 0.4 }}
                />
              </div>
            ) : (
              /* Clean Minimal Solid Black / Subtle Radial Ambient Glow when image is removed */
              <div className="absolute inset-0 z-0 bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/60 via-black to-black" />
            )}

            {/* Top-left Hero Tag */}
            <div className="relative z-10 px-8 pt-8 sm:px-14 sm:pt-12">
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#fec52d]">
                {works?.heroTag || '// PORTFOLIO ARCHIVE'}
              </p>
            </div>

            {/* Large left-aligned stacked title + subtitle at bottom */}
            <div className="relative z-10 px-8 pb-10 sm:px-14 sm:pb-14 max-w-5xl">
              <h1 className="font-horas text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] uppercase font-bold tracking-tight text-white leading-[0.88] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                {(works?.title || 'SELECTED ARCHIVE').split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
                <span className="text-white">.</span>
              </h1>
              <p className="mt-5 font-ppmori text-xs sm:text-sm text-neutral-300 max-w-sm leading-relaxed uppercase tracking-wider">
                {works?.subtitle || 'Bespoke film poster key art, character visuals, and cinematic advertising campaigns.'}
              </p>
            </div>
          </section>
        );
      })()}

      {/* =========================================================================
          CATEGORY NAVIGATION TABS
          ========================================================================= */}
      <section className="sticky top-20 z-30 w-full bg-black border-y border-neutral-900/80 py-3 sm:py-4 px-3 sm:px-6 shadow-[0_8px_20px_rgba(0,0,0,0.7)]">
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
          PORTFOLIO GRID: 4 Columns (Dynamic Category & Grid Aspect Ratios)
          ========================================================================= */}
      <section id="work-grid" className="w-full p-0 m-0 bg-black">
        <motion.div
          layout
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 p-0 m-0"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // 1. Individual project override -> 2. Category ratio -> 3. Active tab ratio -> 4. Global grid ratio
              const itemRatio = resolveCardRatio(
                item.aspectRatio,
                item.category,
                activeTab,
                works?.categoryRatios,
                works?.gridAspectRatio || defaultGridRatio
              );
              const itemPosition = item.objectPosition || 'center';
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  style={{ aspectRatio: itemRatio }}
                  className="group relative w-full overflow-hidden rounded-none border-b sm:border-r border-neutral-900/60 bg-neutral-950 block"
                >
                  <div className="relative w-full h-full block overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
                      style={{ objectPosition: itemPosition }}
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                      quality={90}
                      loading={idx < 6 ? 'eager' : 'lazy'}
                      priority={idx < 4}
                      unoptimized={item.image?.startsWith('http')}
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
            );
          })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
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
