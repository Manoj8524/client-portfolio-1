'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { Lightbulb, BookOpen, Compass, Film, Sparkles, Brain } from 'lucide-react';

const capabilities = [
  { title: 'Intellectual Property Incubation', description: 'Developing original cinematic scripts, concepts, and IP universes', icon: Lightbulb },
  { title: 'Narrative Strategy', description: 'Structuring compelling character arcs and world-building frameworks', icon: BookOpen },
  { title: 'Creative R&D Lab', description: 'Experimenting with cutting-edge visual techniques and storytelling formats', icon: Brain },
  { title: 'Cultural Advisory', description: 'Deep regional nuances and authentic pan-Indian appeal consulting', icon: Compass },
  { title: 'Concept Pitch Decks', description: 'High-craft lookbooks and decks for studio greenlighting', icon: Film },
  { title: 'Creative Direction', description: 'Holistic vision stewardship from screenplay to release', icon: Sparkles }
];

export default function ThinkeryPage() {
  return (
    <ServicePageLayout
      badge="// THE CREATIVE INCUBATOR"
      title="Thinkery"
      tagline1="Where Raw Ideas."
      tagline2="Become Masterpieces."
      heroImage="/home_images/services-image.webp"
      services={capabilities}
    />
  );
}
