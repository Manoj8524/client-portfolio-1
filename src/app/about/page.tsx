'use client';

import { useState, useEffect } from 'react';
import { Film, Sparkles, Users, Award } from 'lucide-react';
import ActionBanner from '@/components/ui/ActionBanner';
import { getVisionImages, getEmployeePhotos } from '@/lib/api';
import type { VisionImageItem, EmployeePhotoItem } from '@/types';

const features = [
  {
    name: 'High-Quality Productions',
    description: 'We deliver top-notch content that exceeds industry standards.',
    icon: Film
  },
  {
    name: 'Creative Storytelling',
    description: 'Our team crafts compelling narratives that captivate audiences.',
    icon: Sparkles
  },
  {
    name: 'Experienced Team',
    description: 'Years of experience, unmatched expertise in every project.',
    icon: Users
  },
  {
    name: 'Award-Winning',
    description: 'Our work has been recognized with numerous industry accolades.',
    icon: Award
  }
];

function getValidImageUrl(src?: string | null): string {
  if (!src || typeof src !== 'string') return '/placeholder.svg';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `https://yt.jinskadamthodu.com/public${src.startsWith('/') ? '' : '/'}${src}`;
}

export default function AboutPage() {
  const [visionImages, setVisionImages] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [vision, team] = await Promise.all([
          getVisionImages(),
          getEmployeePhotos()
        ]);
        const vList = Array.isArray(vision) ? vision : vision?.data || [];
        const tList = Array.isArray(team) ? team : team?.data || [];
        setVisionImages(vList);
        setTeamMembers(tList);
      } catch (err) {
        console.error('Failed to load about page data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center padding-primary pt-12 pb-20 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-4">
            // ABOUT ME
          </p>
          <h1 className="font-horas text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none mb-6">
            I am <br />
            <span className="text-yellow-400">Muthu</span>
          </h1>
          <p className="font-ppmori text-lg sm:text-2xl text-neutral-300 max-w-3xl mx-auto tracking-wide mb-16 leading-relaxed">
            I am a multidisciplinary graphic &amp; film poster designer dedicated to creating iconic key art, cinematic visual identities, and captivating designs for cinema and digital media.
          </p>

          {/* Core Values Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {features.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col items-center text-center hover:border-neutral-700 transition-colors"
              >
                <div className="p-3 rounded-full bg-white/5 mb-4 text-yellow-400">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-horas text-lg uppercase tracking-wide text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-neutral-400 font-ppmori leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 15 YEARS STATEMENT BANNER (YELLOW CALLOUT) */}
      <section className="relative w-full bg-[#fec52d] text-black py-24 padding-primary">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-none mb-6">
            15 Years of <br />
            Cinematic Alchemy
          </h2>
          <p className="font-ppmori text-lg sm:text-2xl text-neutral-900 max-w-3xl mx-auto leading-relaxed">
            Every story begins with a spark, a moment of inspiration. Ours was born 15 years ago from a love of cinema and the art of visual storytelling. Design is our language, and we speak it exceptionally.
          </p>
        </div>
      </section>

      {/* 3. VISION IMAGES COLLAGE */}
      {visionImages.length > 0 && (
        <section className="relative padding-primary py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              // OUR VISION & PHILOSOPHY
            </p>
            <h2 className="font-horas text-4xl sm:text-6xl uppercase tracking-tight">
              Inspiration in Action
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {visionImages.map((v, i) => (
              <div
                key={v.id || i}
                className="relative rounded-2xl overflow-hidden group aspect-[4/3] bg-neutral-900 border border-neutral-800"
              >
                <img
                  src={getValidImageUrl(v.image)}
                  alt={v.title || `Vision image ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {v.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <p className="font-horas text-xl uppercase tracking-wide text-white">
                      {v.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. MEET THE MASTERS (TEAM MEMBERS) */}
      {teamMembers.length > 0 && (
        <section className="relative padding-primary py-24 border-t border-neutral-900">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              // THE CREATIVE COLLECTIVE
            </p>
            <h2 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight">
              Meet the Masters
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                <img
                  src={getValidImageUrl(member.photo || member.image)}
                  alt={`${member.name} - ${member.designation}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-4 transition-transform duration-300">
                  <h3 className="font-horas text-lg sm:text-xl uppercase tracking-wide text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. ACTION BANNER */}
      <section className="relative w-full padding-primary pb-20">
        <ActionBanner
          normalString="Ready to work with the [BR] masters of cinema? [BR]"
          highlightString="Let's Connect."
          buttonString="Get in Touch"
          buttonLink="/contact"
        />
      </section>
    </div>
  );
}
