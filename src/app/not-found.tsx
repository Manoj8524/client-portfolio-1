import Link from 'next/link';
import { Compass, Home, Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden flex items-center justify-center padding-primary">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto max-w-2xl text-center py-20">
        <h1 className="font-horas text-8xl sm:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="font-horas text-2xl sm:text-3xl uppercase tracking-wider text-neutral-300 mb-4">
          Lost in Space
        </h2>
        <p className="font-ppmori text-base sm:text-lg text-neutral-400 leading-relaxed mb-10 max-w-xl mx-auto">
          The page you&apos;re looking for seems to have drifted off into the cosmos. Let&apos;s get you back to exploring our cinematic collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <Link
            href="/works/film-poster-design"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            <Film className="w-5 h-5 text-yellow-400" />
            Explore Film Posters
          </Link>
        </div>
      </div>
    </div>
  );
}
