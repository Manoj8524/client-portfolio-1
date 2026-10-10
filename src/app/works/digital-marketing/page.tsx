'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { Share2, FileText, BarChart3, Search, Users } from 'lucide-react';

const capabilities = [
  { title: 'Social Media Marketing', description: 'Engaging audiences across social platforms', icon: Share2 },
  { title: 'Content Marketing', description: 'Creating valuable content to attract and retain customers', icon: FileText },
  { title: 'Campaign Management', description: 'Overseeing and optimizing marketing campaigns', icon: BarChart3 },
  { title: 'Search Engine Optimization (SEO)', description: 'Improving visibility in search engine results', icon: Search },
  { title: 'Influencer Marketing', description: 'Collaborating with influencers to promote your brand', icon: Users }
];

export default function DigitalMarketingPage() {
  return (
    <ServicePageLayout
      badge="// DIGITAL DOMINANCE"
      title="Digital Marketing"
      tagline1="Noise Is Everywhere."
      tagline2="We Create Signal."
      heroImage="/1680x1050.webp"
      services={capabilities}
    />
  );
}
