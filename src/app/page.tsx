import StarterHome from '@/components/home/StarterHome';
import { getServices, getClients } from '@/lib/api';
import filmPostersData from '@/data/filmPostersData.json';

const defaultServices = [
  {
    name: 'Branding',
    path: '/works?category=BRANDING',
    desc: 'Distinctive visual identities, logos, brand guides and strategic positioning.',
    slug: 'branding'
  },
  {
    name: 'Social Media Creatives',
    path: '/works?category=SOCIAL+MEDIA+CREATIVES',
    desc: 'Performance advertising, social media curation and viral creative visual campaigns.',
    slug: 'social-media-creatives'
  },
  {
    name: 'Film Posters',
    path: '/works?category=FILM+POSTERS',
    desc: 'Bespoke key visuals, first-look teasers, character artworks and international festival posters.',
    slug: 'film-posters'
  },
  {
    name: 'Print & Ads',
    path: '/works?category=PRINT+%26+ADS',
    desc: 'High-impact print advertising, packaging mockups, outdoor billboards and brand collateral.',
    slug: 'print-and-ads'
  }
];

export default async function HomePage() {
  let clients: any[] = [];
  try {
    const rawClients = await getClients();
    if (Array.isArray(rawClients)) {
      clients = rawClients.slice(0, 24);
    }
  } catch {
    clients = [];
  }

  // Use top film posters from the cached dataset
  const featuredPosters = (filmPostersData || []).slice(0, 8);

  return (
    <StarterHome
      services={defaultServices}
      featuredPosters={featuredPosters}
      clients={clients}
    />
  );
}
