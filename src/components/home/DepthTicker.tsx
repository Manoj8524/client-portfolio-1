'use client';

import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

// Real Film Poster Artworks from Yellowtooths Cinema Portfolio
const tickerPosters = [
  { id: '218', src: '/film_posters_cache/poster_218.webp', alt: "Don't Trouble the Trouble - Film Poster" },
  { id: '217', src: '/film_posters_cache/poster_217.webp', alt: 'Picnic - Film Poster' },
  { id: '216', src: '/film_posters_cache/poster_216.webp', alt: 'Aasha - Film Poster' },
  { id: '214', src: '/film_posters_cache/poster_214.webp', alt: 'Mela - Film Poster' },
  { id: '215', src: '/film_posters_cache/poster_215.webp', alt: 'Operation Gnaga - Film Poster' },
  { id: '211', src: '/film_posters_cache/poster_211.webp', alt: 'Bethlehem Kudumba Unit - Film Poster' },
  { id: '210', src: '/film_posters_cache/poster_210.webp', alt: 'Dhoomakethu - Film Poster' },
  { id: '209', src: '/film_posters_cache/poster_209.webp', alt: 'Rao Bahadur - Film Poster' },
  { id: '208', src: '/film_posters_cache/poster_208.webp', alt: 'Nedumkandam Miracle - Film Poster' },
  { id: '97', src: '/film_posters_cache/poster_97.webp', alt: 'Irumudi - Film Poster' },
  { id: '207', src: '/film_posters_cache/poster_207.webp', alt: 'Raasa Leela - Film Poster' },
  { id: '213', src: '/film_posters_cache/poster_213.webp', alt: 'Pallaburusu - Film Poster' },
  { id: '212', src: '/film_posters_cache/poster_212.webp', alt: 'Radhimaa - Film Poster' },
  { id: '206', src: '/film_posters_cache/poster_206.webp', alt: 'Maa Inti Bangaaram - Film Poster' },
  { id: '205', src: '/film_posters_cache/poster_205.webp', alt: 'Balan: The Boy - Film Poster' },
  { id: '204', src: '/film_posters_cache/poster_204.webp', alt: 'Sing Geetham - Film Poster' },
  { id: '89', src: '/film_posters_cache/poster_89.webp', alt: 'I, Nobody - Film Poster' },
  { id: '187', src: '/film_posters_cache/poster_187.webp', alt: 'Rowdy Janardhana - Film Poster' },
  { id: '202', src: '/film_posters_cache/poster_202.webp', alt: 'Kattalan - Film Poster' },
  { id: '203', src: '/film_posters_cache/poster_203.webp', alt: 'Mollywood Times - Film Poster' },
];

export default function DepthTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const baseX = useMotionValue(0);

  // Exact Framer: 13 items, 355px each, gap 10px -> 365px per item
  const itemWidth = 365;
  const singleSetWidth = tickerPosters.length * itemWidth; // 4745px

  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    const moveBy = (delta / 1000) * 80; // Smooth ~80px per second ticker speed
    const current = baseX.get();
    const next = current - moveBy;
    if (next <= -singleSetWidth) {
      baseX.set(next + singleSetWidth);
    } else {
      baseX.set(next);
    }
  });

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[355px] cursor-grab active:cursor-grabbing select-none"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="flex flex-row items-center gap-[10px] h-[355px] will-change-transform"
        style={{
          x: baseX,
          width: 'max-content',
          transformStyle: 'preserve-3d',
        }}
        drag="x"
        dragConstraints={{ left: -singleSetWidth * 2, right: singleSetWidth }}
        dragElastic={0.05}
      >
        {/* Quadruple array for infinite uninterrupted continuous wrap */}
        {[...tickerPosters, ...tickerPosters, ...tickerPosters, ...tickerPosters].map((poster, index) => (
          <div
            key={`${poster.id}-${index}`}
            className="flex-none h-[355px] w-[355px] relative overflow-hidden bg-black select-none pointer-events-auto"
            style={{
              aspectRatio: '1 / 1',
            }}
          >
            <img
              src={poster.src}
              alt={poster.alt}
              loading={index < 8 ? 'eager' : 'lazy'}
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03] select-none pointer-events-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
