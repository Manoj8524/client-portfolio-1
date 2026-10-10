'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { Target, Share2, Users, Radio, MessageSquare, MonitorPlay, Calendar, ShieldCheck } from 'lucide-react';

const capabilities = [
  { title: 'Strategic Campaign Planning', description: 'Comprehensive strategies for impactful campaigns', icon: Target },
  { title: 'Digital Promotions', description: 'Effective online promotional tactics', icon: Share2 },
  { title: 'Influencer Management', description: 'Leveraging influencers for brand growth', icon: Users },
  { title: 'Media Outreach', description: 'Expanding your reach through various media channels', icon: Radio },
  { title: 'Interview Management', description: 'Coordinating and optimizing interview opportunities', icon: MessageSquare },
  { title: 'Cinema & Outdoor Advertising', description: 'Impactful ads for cinema and outdoor spaces', icon: MonitorPlay },
  { title: 'Event Management', description: 'Seamless planning and execution of events', icon: Calendar },
  { title: 'Anti-Piracy', description: 'Protecting your content from unauthorized use', icon: ShieldCheck }
];

export default function FilmPromotionPage() {
  return (
    <ServicePageLayout
      badge="// CINEMATIC CAMPAIGNS"
      title="Film Promotion"
      tagline1="Big Promotions? That's Yesterday."
      tagline2="Today, We Go Gigantic."
      heroImage="/1680x1050.webp"
      services={capabilities}
    />
  );
}
