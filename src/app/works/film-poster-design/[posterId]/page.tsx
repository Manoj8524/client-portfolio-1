'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Film } from 'lucide-react';
import { getFilmPosterById, getFilmPosters } from '@/lib/api';

export default function FilmPosterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const posterId = params?.posterId as string;

  const [poster, setPoster] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPoster() {
      if (!posterId) return;
      try {
        let data = await getFilmPosterById(posterId);
        if (!data) {
          // fallback search from all posters list
          const all = await getFilmPosters();
          const list = all?.data || all || [];
          data = list.find((p: any) => String(p.id) === String(posterId) || p.slug === posterId);
        }
        setPoster(data);
      } catch (err) {
        console.error('Error fetching poster', err);
      } finally {
        setLoading(false);
      }
    }
    loadPoster();
  }, [posterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!poster) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center padding-primary text-center">
        <h1 className="font-horas text-4xl mb-4">Poster Not Found</h1>
        <p className="text-neutral-400 mb-8 font-ppmori">The requested film poster could not be found.</p>
        <Link
          href="/works/film-poster-design"
          className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-yellow-400"
        >
          Back to Posters
        </Link>
      </div>
    );
  }

  const mainImg = poster.main_image || poster.image;
  const fullImg = mainImg?.startsWith('http') ? mainImg : `https://yt.jinskadamthodu.com/public${mainImg}`;
  const additionalImages = poster.images || [];

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white padding-primary pt-8 pb-24">
      <div className="container mx-auto max-w-7xl">
        {/* Navigation Bar */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Posters
          </button>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-yellow-400 mb-2">
            // {poster.genre || poster.language || 'Official Poster Design'}
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white mb-6">
            {poster.film_name || poster.title}
          </h1>

          {poster.description && (
            <p className="font-ppmori text-neutral-300 text-base md:text-lg max-w-3xl leading-relaxed mb-6">
              {poster.description}
            </p>
          )}

          <div className="flex flex-wrap gap-6 text-sm font-mono text-neutral-400 border-y border-neutral-900 py-4">
            {(poster.year || poster.year_of_release) && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span>Year: {poster.year || poster.year_of_release}</span>
              </div>
            )}
            {poster.language && (
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-neutral-500" />
                <span>Language: {poster.language}</span>
              </div>
            )}
            {poster.imdb_rating && (
              <div className="text-yellow-400 font-semibold">
                IMDb: ★ {poster.imdb_rating}
              </div>
            )}
            {poster.imdb_link && (
              <a
                href={poster.imdb_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:underline"
              >
                IMDb Page <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {poster.wikipedia_link && (
              <a
                href={poster.wikipedia_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:underline"
              >
                Wikipedia <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Poster Media Presentation */}
        <div className="space-y-12">
          {/* Main Key Art */}
          <div className="rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-900 max-w-4xl mx-auto">
            <img
              src={fullImg}
              alt={poster.film_name || poster.title}
              className="w-full h-auto object-contain max-h-[85vh] mx-auto"
            />
          </div>

          {/* Additional Variants & Collateral */}
          {additionalImages.length > 0 && (
            <div>
              <h2 className="font-horas text-2xl uppercase tracking-wider text-neutral-400 mb-6 text-center">
                Campaign Key Art & Variants
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {additionalImages.map((imgObj: any, idx: number) => {
                  const subImg = imgObj.file_path || imgObj.image || imgObj;
                  const fullSubImg = typeof subImg === 'string' && subImg.startsWith('http')
                    ? subImg
                    : `https://yt.jinskadamthodu.com/public${subImg}`;

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 aspect-[2/3]"
                    >
                      <img
                        src={fullSubImg}
                        alt={`Variant ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
