'use client';

import Auth from '@/components/auth/Auth';
import Hero from '@/components/pages/home/Hero';
import MasonryGallery from '@/components/pages/home/MasonryGallery';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <Hero />
        <Auth />
      </div>
      <MasonryGallery />
    </>
  );
}
