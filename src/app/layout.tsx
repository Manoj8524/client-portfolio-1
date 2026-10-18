import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/providers/SmoothScroll';

export const metadata: Metadata = {
  title: 'Muthu — Creative Design Studio & Film Poster Portfolio',
  description: 'Bespoke key visuals, branding, graphic design, and cinematic storytelling.',
  icons: {
    icon: '/favicon-02.svg',
    apple: '/favicon-02.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon-02.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon-02.svg" />
      </head>
      <body className="bg-black text-white antialiased min-h-screen flex flex-col selection:bg-yellow-400 selection:text-black">
        <SmoothScroll>
          <Suspense fallback={<div className="h-20" />}>
            <Navbar />
          </Suspense>
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              {children}
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </SmoothScroll>
      </body>
    </html>
  );
}
