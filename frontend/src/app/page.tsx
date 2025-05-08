'use client';

import Auth from '@/components/auth/Auth';
import Gallery from '@/components/pages/home/Gallery';
import Hero from '@/components/pages/home/Hero';
import Sponsors from '@/components/pages/home/Sponsors';
import { Button } from '@/components/ui/button';
import useButtonFound from '@/hooks/useButtonFound';
import { BarScroll } from '@/components/ui/barscroll';

export default function Home() {
  const { disabled, handleClick } = useButtonFound();
  return (
    <div className="bg-background flex flex-col items-center w-full">
      <BarScroll side="left" />
      <BarScroll side="right" />
      <div className="flex flex-col gap-y-6 mb-20">
        <Hero />
        <Auth />
        {
        process.env.NODE_ENV === 'development' && (
          <Button className="z-0" disabled={disabled} onClick={handleClick}>
            Secret xd
          </Button>
        )
      }
      </div>
      <Sponsors />
      <Gallery />
    </div>
  );
}
