import StarterHome from '@/components/home/StarterHome';
import { getSiteContent } from '@/lib/contentStore';

export default function HomePage() {
  const siteContent = getSiteContent();

  return (
    <StarterHome initialData={siteContent} />
  );
}
