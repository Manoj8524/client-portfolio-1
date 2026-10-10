'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getGallery } from '@/lib/api';

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [activeMedia, setActiveMedia] = useState<any | null>(null);

  useEffect(() => {
    async function loadGallery() {
      const res = await getGallery();
      const list = res?.data || res || [];
      if (Array.isArray(list)) {
        setItems(list);
      }
    }
    loadGallery();
  }, []);

  const filters = ['all', ...Array.from(new Set(items.map((i) => i.filter || i.type).filter(Boolean)))];

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.filter === filter || item.type === filter;
  });

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white padding-primary pt-12 pb-24">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-4">
            // MOMENTS & MILESTONES
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
            Our Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]">
              In Visuals.
            </span>
          </h1>
          <p className="font-ppmori text-neutral-400 text-sm md:text-lg max-w-2xl leading-relaxed">
            A dynamic showcase of our passion, dedication, success and finest moments—because every great story deserves to be seen.
          </p>
        </section>

        {/* Filter Tabs */}
        {filters.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  filter === f
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {f.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        )}

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const src = item.file_path || item.image;
            const fullSrc = src?.startsWith('http') ? src : `https://yt.jinskadamthodu.com/public${src}`;
            const isVideo = item.type === 'video' || (typeof src === 'string' && src.endsWith('.mp4'));

            return (
              <div
                key={item.id}
                onClick={() => setActiveMedia({ ...item, fullSrc, isVideo })}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 cursor-pointer"
              >
                {isVideo ? (
                  <video
                    src={fullSrc}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={fullSrc}
                    alt={item.title || `Gallery item ${item.id}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest font-mono text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {activeMedia && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveMedia(null)}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeMedia.isVideo ? (
                <video
                  src={activeMedia.fullSrc}
                  controls
                  autoPlay
                  className="max-h-[85vh] max-w-full rounded-2xl object-contain"
                />
              ) : (
                <img
                  src={activeMedia.fullSrc}
                  alt={activeMedia.title || 'Preview'}
                  className="max-h-[85vh] max-w-full rounded-2xl object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
