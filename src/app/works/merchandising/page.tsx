'use client';

import ServicePageLayout from '@/components/services/ServicePageLayout';
import { Shirt, Tag, Package, ShoppingBag, Palette, Sparkles } from 'lucide-react';

const capabilities = [
  { title: 'Collector Apparel', description: 'Limited-edition merchandise designed with cinematic detail', icon: Shirt },
  { title: 'Custom Packaging', description: 'Bespoke boxes, sleeves, and presentation materials', icon: Package },
  { title: 'Brand Memorabilia', description: 'Iconic keepsake items that fans cherish', icon: Sparkles },
  { title: 'Apparel Graphics', description: 'Bold typography and screen printing artwork', icon: Palette },
  { title: 'Production Sourcing', description: 'Premium material manufacturing and quality control', icon: Tag },
  { title: 'Distribution Support', description: 'Fulfillment and retail packaging strategies', icon: ShoppingBag }
];

export default function MerchandisingPage() {
  return (
    <ServicePageLayout
      badge="// PHYSICAL ARTIFACTS"
      title="Merchandising"
      tagline1="Turn Cinema Fans."
      tagline2="Into Brand Advocates."
      heroImage="/1680x1050.webp"
      services={capabilities}
    />
  );
}
