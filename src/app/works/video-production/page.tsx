'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { Video, Film, Building2, Box } from 'lucide-react';

const capabilities = [
  { title: 'Advertisements', description: 'Captivating ads that leave a lasting impression', icon: Video },
  { title: 'Reel Ads', description: 'Engaging reels that capture audience attention', icon: Film },
  { title: 'Corporate Video', description: 'Professional videos that elevate your brand', icon: Building2 },
  { title: '3D/2D Animations', description: 'Stunning animations that bring ideas to life', icon: Box }
];

export default function VideoProductionPage() {
  return (
    <ServicePageLayout
      badge="// CINEMATIC MOTION"
      title="Video Production"
      tagline1="From First Storyboard."
      tagline2="To Final Master Frame."
      heroVideo="/video/MainVideo.mp4"
      services={capabilities}
    />
  );
}
