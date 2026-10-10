'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface CTAProps {
  normalString?: string;
  highlightString?: string;
  buttonString?: string;
  buttonLink?: string;
}

export default function ActionBanner({
  normalString = 'Partner with us to [BR] Create something [BR]',
  highlightString = 'Unforgettable.',
  buttonString = 'Reach out to us',
  buttonLink = '/contact'
}: CTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderText = (str: string) => {
    return str.split('[BR]').map((part, idx, arr) => (
      <span key={idx}>
        {part}
        {idx < arr.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="container mx-auto mt-16 max-w-full text-center py-12">
      <p
        className={`mb-8 text-3xl sm:text-5xl md:text-7xl font-normal tracking-tight transition-colors duration-500 ease-in-out font-horas uppercase leading-tight ${
          isHovered ? 'text-white' : 'text-neutral-500'
        }`}
      >
        {renderText(normalString)}
        <span className={`transition-colors duration-500 ease-in-out ${isHovered ? 'text-yellow-400' : 'text-white'}`}>
          {highlightString}
        </span>
      </p>

      <div className="inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Link
          href={buttonLink}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-base md:text-lg hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
        >
          {buttonString}
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
