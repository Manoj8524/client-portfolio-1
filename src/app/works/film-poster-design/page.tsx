'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import { getFilmPosters } from '@/lib/api';

export default function FilmPosterDesignPage() {
  const [posters, setPosters] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosters() {
      try {
        const res = await getFilmPosters();
        const list = res?.data || res || [];
        if (Array.isArray(list)) {
          setPosters(list);
        }
      } catch (err) {
        console.error('Failed to load film posters', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosters();
  }, []);

  const years = [
    'all',
    ...Array.from(new Set(posters.map((p) => p.year || p.year_of_release).filter(Boolean))).sort(
      (a: any, b: any) => Number(b) - Number(a)
    )
  ];

  const filteredPosters = posters.filter((p) => {
    const title = (p.film_name || p.title || '').toLowerCase();
    const genre = (p.genre || '').toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = !query || title.includes(query) || genre.includes(query);

    const year = p.year || p.year_of_release;
    const matchesYear = selectedYear === 'all' || String(year) === String(selectedYear);

    return matchesSearch && matchesYear;
  });

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white padding-primary pt-12 pb-24">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-4">
            // CINEMATIC ART & KEY VISUALS
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
            Film Poster <br />
            <span className="text-yellow-400">Design.</span>
          </h1>
          <p className="font-ppmori text-neutral-400 text-sm md:text-lg max-w-2xl leading-relaxed">
            From official first-look posters to global festival key art, explore the visual identities of India&apos;s most anticipated films.
          </p>
        </section>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by film or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {years.map((y) => (
              <button
                key={String(y)}
                onClick={() => setSelectedYear(String(y))}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition-colors ${
                  selectedYear === String(y)
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {String(y)}
              </button>
            ))}
          </div>
        </div>

        {/* Posters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredPosters.map((poster) => {
            const img = poster.main_image || poster.image;
            const fullImg = img?.startsWith('http') ? img : `https://yt.jinskadamthodu.com/public${img}`;
            const filmName = poster.film_name || poster.title;

            return (
              <Link
                key={poster.id}
                href={`/works/film-poster-design/${poster.id}`}
                className="group relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-yellow-400/50 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[2/3] w-full overflow-hidden bg-neutral-900 relative">
                  <img
                    src={fullImg}
                    alt={filmName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs uppercase tracking-widest font-mono text-yellow-400 flex items-center gap-1">
                      View Project <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-950">
                  <h3 className="font-horas text-base uppercase tracking-wide text-white truncate">
                    {filmName}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-1">
                    <span>{poster.language || 'Malayalam'}</span>
                    <span>{poster.year || poster.year_of_release || ''}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
