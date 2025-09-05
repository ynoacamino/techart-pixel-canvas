'use client';

import { useAuth } from '@/components/contexts/AuthProvider';
import { Blocks } from '@/components/ui/blocks';
import { useMediaQuery } from 'react-responsive';

export default function Hero() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { user, isLoading } = useAuth();
  return (
    <div className="grow basis-lg flex flex-col gap-y-10 items-center justify-center relative">
      <h1 className="text-5xl lg:text-6xl font-bold text-center uppercase">
        Tech Art
      </h1>
      <div className="flex gap-0.5 absolute bottom-1/2 translate-y-48">
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="blue" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="green" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="pink" />
      </div>
      <div className="flex gap-0.5 absolute top-1/2 -translate-y-48">
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="purple" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="red" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="yellow" />
      </div>
      <Blocks cols={2} rows={7} ratio={1.5} color="cyan" className="hidden md:grid absolute translate-x-56" />
      <Blocks cols={2} rows={7} ratio={1.5} color="orange" className="hidden md:grid absolute -translate-x-56" />
    </div>
  );
}
