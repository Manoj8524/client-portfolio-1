'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { Code, Smartphone, Layout, ShoppingBag, Globe, Shield } from 'lucide-react';

const capabilities = [
  { title: 'Web Development', description: 'Creating responsive and dynamic websites', icon: Code },
  { title: 'App Development', description: 'Building innovative mobile applications', icon: Smartphone },
  { title: 'UI/UX Design', description: 'Designing intuitive and engaging user experiences', icon: Layout },
  { title: 'E-Commerce', description: 'Developing robust online shopping platforms', icon: ShoppingBag },
  { title: 'Web Application', description: 'Creating powerful browser-based software solutions', icon: Globe },
  { title: 'Cyber Security', description: 'Protecting digital assets and ensuring data safety', icon: Shield }
];

export default function TechnologyAndExperienceDesignPage() {
  return (
    <ServicePageLayout
      badge="// INTERACTIVE & EXPERIENCES"
      title="Technology & Experience Design"
      tagline1="Code That Performs."
      tagline2="Design That Mesmerizes."
      heroImage="/1680x1050.webp"
      services={capabilities}
    />
  );
}
