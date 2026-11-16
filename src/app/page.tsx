import StarterHome from '@/components/home/StarterHome';
import { getSiteContent } from '@/lib/contentStore';

export default async function HomePage() {
  const siteContent = getSiteContent();

  return (
    <StarterHome initialData={siteContent} />
  );
}
