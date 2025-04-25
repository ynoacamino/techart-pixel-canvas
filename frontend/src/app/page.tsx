'use client';

import Auth from '@/components/auth/Auth';
import Gallery from '@/components/pages/home/Gallery';
import Hero from '@/components/pages/home/Hero';
import MasonryGallery from '@/components/pages/home/MasonryGallery';

export default function Home() {
  return (
    <>
      <div className="relative lg:fixed top-0 w-full flex flex-col gap-y-6 py-6 px-3 items-center justify-center">
        <Hero />
        <Auth />
      </div>
      <Gallery side="left" />
      <Gallery side="right" />
      <MasonryGallery />
    </>
  );
}
