import StarterHome from '@/components/home/StarterHome';
import { getServices, getClients } from '@/lib/api';
import filmPostersData from '@/data/filmPostersData.json';

const defaultServices = [
  {
    name: 'Film Poster Design',
    path: '/works/film-poster-design',
    desc: 'Bespoke key visuals, first-look teasers, character artworks and international festival posters.',
    slug: 'film-poster-design'
  },
  {
    name: 'Film Promotion',
    path: '/works/film-promotion',
    desc: '360° promotional campaigns, digital launch rollouts, publicity design and viral activations.',
    slug: 'film-promotion'
  },
  {
    name: 'Branding',
    path: '/works/branding',
    desc: 'Distinctive visual identities, logos, brand guides and strategic positioning for enterprises.',
    slug: 'branding'
  },
  {
    name: 'Digital Marketing',
    path: '/works/digital-marketing',
    desc: 'Performance advertising, social media curation, influencer partnerships and analytics.',
    slug: 'digital-marketing'
  },
  {
    name: 'Technology & Experience',
    path: '/works/technology-&-experience-design',
    desc: '3D interactive websites, immersive brand experiences, web apps and creative digital installations.',
    slug: 'technology-&-experience-design'
  },
  {
    name: 'Video Production',
    path: '/works/video-production',
    desc: 'Cinematic showreels, teasers, music videos, commercial TVCs and broadcast motion design.',
    slug: 'video-production'
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
