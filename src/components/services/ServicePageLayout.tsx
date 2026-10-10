'use client';

import { LucideIcon } from 'lucide-react';
import ActionBanner from '@/components/ui/ActionBanner';

interface ServiceItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface ServicePageProps {
  badge?: string;
  title: string;
  tagline1?: string;
  tagline2?: string;
  heroImage?: string;
  heroVideo?: string;
  services: ServiceItem[];
  worksDescription?: string;
}

export default function ServicePageLayout({
  badge = '// SERVICE SHOWCASE',
  title,
  tagline1 = "Big Ideas? That's Yesterday.",
  tagline2 = 'Today, We Go Iconic.',
  heroImage = '/1680x1050.webp',
  heroVideo,
  services,
  worksDescription
}: ServicePageProps) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[45vh] sm:h-[55vh] w-full flex items-center justify-center overflow-hidden bg-black">
        {heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />

        <div className="relative z-10 text-center padding-primary">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-3">
            {badge}
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-yellow-400">
            {title}
          </h1>
        </div>
      </section>

      {/* 2. EDITORIAL LAMP CALLOUT */}
      <section className="py-20 padding-primary text-center bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <p className="font-horas text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-neutral-400 leading-tight mb-2">
            {tagline1}
          </p>
          <p className="font-horas text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
            {tagline2}
          </p>
        </div>
      </section>

      {/* 3. CAPABILITIES / SUBLIST GRID */}
      <section className="padding-primary py-24 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              // WHAT WE OFFER
            </p>
            <h2 className="font-horas text-3xl sm:text-5xl uppercase tracking-tight">
              Specialized Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    {Icon && (
                      <div className="p-3 rounded-2xl bg-white/5 w-fit mb-6 text-yellow-400">
                        <Icon className="w-6 h-6" />
                      </div>
                    )}
                    <h3 className="font-horas text-2xl uppercase tracking-wide text-white mb-3">
                      {svc.title}
                    </h3>
                    <p className="font-ppmori text-sm text-neutral-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-900 text-xs font-mono text-neutral-600">
                    // CAPABILITY 0{i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ACTION BANNER */}
      <section className="padding-primary pb-24">
        <ActionBanner
          normalString="Ready to ignite your [BR] next big campaign? [BR]"
          highlightString="Let's Collaborate."
          buttonString="Start a Project"
          buttonLink="/contact"
        />
      </section>
    </div>
  );
}
