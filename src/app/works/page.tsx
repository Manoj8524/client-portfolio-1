'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import filmPostersData from '@/data/filmPostersData.json';

interface WorkItem {
  id: string | number;
  title: string;
  category: 'Branding' | 'Social Media Creatives' | 'Film Posters' | 'Print & Ads';
  image: string;
  year?: string;
  link?: string;
}

const workItems: WorkItem[] = [
  {
    id: 'work-1',
    title: '2300 LV Gradient Mode',
    category: 'Branding',
    image: '/extracted_assets/work/work_card_1.webp',
    year: '2026',
    link: '/works?category=BRANDING'
  },
  {
    id: 'work-2',
    title: 'Macbook Mockups',
    category: 'Print & Ads',
    image: '/extracted_assets/work/work_card_2.webp',
    year: '2026',
    link: '/works?category=PRINT+%26+ADS'
  },
  {
    id: 'work-3',
    title: 'Cream Tube Packaging',
    category: 'Branding',
    image: '/extracted_assets/work/work_card_3.webp',
    year: '2026',
    link: '/works?category=BRANDING'
  },
  {
    id: 'work-4',
    title: 'Sign Mockups Design',
    category: 'Social Media Creatives',
    image: '/extracted_assets/work/work_card_4.webp',
    year: '2026',
    link: '/works?category=SOCIAL+MEDIA+CREATIVES'
  },
  {
    id: 'work-5',
    title: 'Dispenser Bottle Mockup',
    category: 'Print & Ads',
    image: '/extracted_assets/work/work_card_5.webp',
    year: '2026',
    link: '/works?category=PRINT+%26+ADS'
  },
  {
    id: 'work-6',
    title: 'Modern Cylinders & Dryers',
    category: 'Social Media Creatives',
    image: '/extracted_assets/work/work_card_6.webp',
    year: '2026',
    link: '/works?category=SOCIAL+MEDIA+CREATIVES'
  }
];

const filmPosterItems: WorkItem[] = (filmPostersData || []).slice(0, 6).map((item: any) => ({
  id: `poster-${item.id}`,
  title: item.film_name,
  category: 'Film Posters' as const,
  image: item.image,
  year: item.year,
  link: `/works/film-poster-design/${item.id}`
}));

const categories = [
  'ALL',
  'BRANDING',
  'SOCIAL MEDIA CREATIVES',
  'FILM POSTERS',
  'PRINT & ADS'
] as const;

function WorksContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeTab, setActiveTab] = useState<string>('ALL');

  useEffect(() => {
    if (categoryParam) {
      const decoded = decodeURIComponent(categoryParam).toUpperCase();
      if (categories.includes(decoded as any)) {
        setActiveTab(decoded);
        const el = document.getElementById('work-grid');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [categoryParam]);

  const getFilteredItems = () => {
    if (activeTab === 'ALL') {
      return workItems;
    }
    if (activeTab === 'FILM POSTERS') {
      return filmPosterItems;
    }
    return workItems.filter(
      (item) => item.category.toUpperCase() === activeTab
    );
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white font-ppmori p-0 m-0 selection:bg-[#fec52d] selection:text-black">
      {/* =========================================================================
          HERO SECTION: Cloned from 02.psb
          Features Matte black & gold abstract eyes background, gold subtitle,
          bold FROM VISION TO VISUAL title, flush edge-to-edge
          ========================================================================= */}
      <section className="relative w-full min-h-[85vh] lg:min-h-screen flex items-center justify-start overflow-hidden pt-28 pb-16 p-0 m-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/extracted_assets/work/work_hero_bg_clean.webp"
            alt="Matte black and gold abstract eyes"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-1" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl flex flex-col items-start gap-4 sm:gap-6"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#fec52d] text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]"
            >
              EXPLORE A SELECTION OF MY WORK
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-horas text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-black text-white leading-[0.88] tracking-tight drop-shadow-2xl"
            >
              FROM
              <br />
              VISION
              <br />
              TO
              <br />
              VISUAL.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-neutral-300 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-medium pt-2 max-w-md leading-relaxed"
            >
              branding, graphic design and
              <br />
              visual storytelling
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY FILTER NAVIGATION BAR: Cloned from 02.psb
          Directly touches hero with NO GAP, full bleed
          ========================================================================= */}
      <section
        id="work-filter"
        className="sticky top-20 z-30 w-full bg-black/95 backdrop-blur-md border-y border-neutral-900/80 py-4 sm:py-5 px-4 m-0"
      >
        <div className="w-full flex items-center justify-center">
          <nav
            aria-label="Portfolio Category Filter"
            className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 md:gap-12"
          >
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative text-xs sm:text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer py-1.5 px-2 ${
                    isActive
                      ? 'text-[#fec52d] font-semibold'
                      : 'text-neutral-400 hover:text-[#fec52d]'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fec52d] rounded-full shadow-[0_0_8px_#fec52d]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* =========================================================================
          PORTFOLIO GRID: 3 Columns x 2 Rows
          ZERO GAP, ZERO SIDE PADDING, ZERO TOP/BOTTOM PADDING, FULL BLEED EDGE-TO-EDGE
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
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group relative w-full aspect-[1588/1985] overflow-hidden rounded-none border-b sm:border-r border-neutral-900/60 bg-neutral-950 block"
              >
                <Link
                  href={item.link || '#'}
                  className="relative w-full h-full block overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                    quality={90}
                    loading={idx < 3 ? 'eager' : 'lazy'}
                  />

                  {/* Hover Sheen & Subtle Dark Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Hover Details Overlay */}
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
                            {item.year}
                          </p>
                        )}
                        <h3 className="font-horas text-xl sm:text-2xl uppercase tracking-wide text-white drop-shadow-md">
                          {item.title}
                        </h3>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-[#fec52d] text-black flex items-center justify-center shadow-lg transform group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}

export default function WorksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <WorksContent />
    </Suspense>
  );
}
