'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { GraduationCap, Film, Palette, Cpu, Sparkles, Layers } from 'lucide-react';

const capabilities = [
  { title: 'Graphic Design + UI/UX With AI Integration', description: 'Master graphic design and UI/UX skills integrated with AI tools to create innovative, user-friendly designs.', icon: Palette },
  { title: 'Graphic Design + 3D With AI Integration', description: 'Explore the integration of AI in graphic design and 3D modeling to craft stunning, interactive visuals.', icon: Layers },
  { title: 'Film Poster Design Masterclass', description: 'Learn the art of creating captivating film posters that capture the essence of cinematic stories.', icon: Film },
  { title: 'Digital Marketing with AI Tools', description: 'Discover how to leverage AI tools for effective digital marketing campaigns and performance optimization.', icon: Cpu },
  { title: 'Mentorship by Industry Legends', description: '1-on-1 critique sessions with senior art directors and creators behind blockbuster films.', icon: GraduationCap },
  { title: 'Portfolio Showcase & Placement', description: 'Real-world studio exposure and direct recommendation into creative agency pipelines.', icon: Sparkles }
];

export default function GlobalAcademyOfArtistryPage() {
  return (
    <ServicePageLayout
      badge="// EDUCATIONAL INITIATIVE"
      title="Global Academy of Artistry"
      tagline1="Nurturing The Next Generation."
      tagline2="Of Cinematic Creators."
      heroImage="/1680x1050.webp"
      services={capabilities}
    />
  );
}
