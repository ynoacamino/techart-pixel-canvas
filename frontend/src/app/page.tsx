'use client';

import Auth from '@/components/auth/Auth';
import Gallery from '@/components/pages/home/Gallery';
import Hero from '@/components/pages/home/Hero';
import Sponsors from '@/components/pages/home/Sponsors';
import { BarScroll } from '@/components/ui/barscroll';

export default function Home() {
  return (
    <div className="bg-background flex flex-col items-center w-full">
      <BarScroll side="left" />
      <BarScroll side="right" />
      <div className="flex flex-col gap-y-6 mb-20">
        <Hero />
        <Auth />
      </div>
      <Sponsors />
      <Gallery />
    </div>
  );
}
