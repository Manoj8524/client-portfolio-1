'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { Sparkles, Palette, Compass, Rocket, MessageCircle, Shield, FileSearch } from 'lucide-react';

const capabilities = [
  { title: 'Brand Name', description: 'Crafting unique and memorable brand names', icon: Sparkles },
  { title: 'Brand Visual Identity', description: 'Designing cohesive visual elements for your brand', icon: Palette },
  { title: 'Brand Strategy', description: 'Developing comprehensive brand positioning and direction', icon: Compass },
  { title: 'Brand Launch', description: 'Orchestrating impactful brand introductions to the market', icon: Rocket },
  { title: 'Brand Communication', description: 'Creating consistent and effective brand messaging', icon: MessageCircle },
  { title: 'Brand Management', description: 'Ongoing stewardship and evolution of your brand', icon: Shield },
  { title: 'Brand Audit', description: 'Comprehensive evaluation of existing brand positioning and equity', icon: FileSearch }
];

export default function BrandingPage() {
  return (
    <ServicePageLayout
      badge="// BRAND ARCHITECTURE"
      title="Branding"
      tagline1="A Great Brand Isn't Made."
      tagline2="It Is Forged."
      heroImage="/home_images/services-image.webp"
      services={capabilities}
    />
  );
}
