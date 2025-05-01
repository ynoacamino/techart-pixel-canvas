'use client';

import Auth from '@/components/auth/Auth';
import Gallery from '@/components/pages/home/Gallery';
import Hero from '@/components/pages/home/Hero';
import Sponsors from '@/components/pages/home/Sponsors';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-6 mb-20">
        <Hero />
        <Auth />
      </div>
      <Sponsors />
      <Gallery />
    </>
  );
}
