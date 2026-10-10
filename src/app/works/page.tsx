'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getServices, getFilmPosters } from '@/lib/api';
import ActionBanner from '@/components/ui/ActionBanner';

function getValidImageUrl(src?: string | null): string {
  if (!src || typeof src !== 'string') return '/placeholder.svg';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `https://yt.jinskadamthodu.com/public${src.startsWith('/') ? '' : '/'}${src}`;
}

export default function WorksPage() {
  const [services, setServices] = useState<any[]>([]);
  const [featuredWorks, setFeaturedWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [srv, posters] = await Promise.all([
          getServices(),
          getFilmPosters()
        ]);
        const srvList = Array.isArray(srv) ? srv : srv?.data || [];
        setServices(srvList);

        const posterList = Array.isArray(posters) ? posters : posters?.data || [];
        setFeaturedWorks(posterList.slice(0, 4));
      } catch (err) {
        console.error('Failed to load works data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white padding-primary pt-12 pb-24">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-4">
            // OUR CREATIVE CAPABILITIES
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
            Experience the Power of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fce39d] to-[#fec52d]">
              What We Create.
            </span>
          </h1>
          <p className="font-ppmori text-neutral-400 text-sm md:text-lg max-w-3xl leading-relaxed">
            Scroll down to see the full spectrum of our featured works that cover every aspect of your path towards excellence.
          </p>
        </section>

        {/* Services Grid */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="font-horas text-3xl sm:text-5xl uppercase tracking-tight">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => {
              const iconImg = svc.icon_path || svc.cover_image;
              const slug = svc.url || svc.slug || '';
              return (
                <Link
                  key={svc.id}
                  href={`/works/${slug}`}
                  className="group p-8 rounded-3xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      {iconImg && (
                        <img
                          src={getValidImageUrl(iconImg)}
                          alt={svc.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      )}
                      <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-yellow-400 group-hover:rotate-45 transition-all" />
                    </div>
                    <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3">
                      {svc.name}
                    </h3>
                    <p className="font-ppmori text-sm text-neutral-400 leading-relaxed line-clamp-3">
                      {svc.description || 'Explore our bespoke creative solutions and strategic excellence.'}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300">
                    <span>Explore Portfolio</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Works Showcase */}
        {featuredWorks.length > 0 && (
          <section className="mb-24 border-t border-neutral-900 pt-20">
            <div className="text-center mb-12">
              <h2 className="font-horas text-3xl sm:text-5xl uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fce39d] to-[#fec52d]">
                Featured Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredWorks.map((item) => {
                const img = item.main_image || item.image;
                const title = item.film_name || item.title || 'Featured Project';
                return (
                  <Link
                    key={item.id}
                    href={`/works/film-poster-design/${item.id}`}
                    className="group relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-900 aspect-[16/10]"
                  >
                    <img
                      src={getValidImageUrl(img)}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                      <p className="text-xs font-mono uppercase tracking-widest text-yellow-400 mb-1">
                        {item.genre || item.category || 'Featured Showcase'}
                      </p>
                      <h3 className="font-horas text-2xl sm:text-3xl uppercase tracking-wide text-white">
                        {title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Action Banner */}
        <ActionBanner
          normalString="Ready to elevate your [BR] next creative venture? [BR]"
          highlightString="Let's Talk."
          buttonString="Start a Project"
          buttonLink="/contact"
        />
      </div>
    </div>
  );
}
