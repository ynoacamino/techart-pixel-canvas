'use client';

import { Blocks } from '@/components/ui/blocks';
import { useMediaQuery } from 'react-responsive';

export default function Subtitle({ primary, secundary }: { primary: string, secundary: string }) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
      <div className="flex">
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="yellow" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="yellow" />
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-5xl font-black">
          {primary}
        </h2>
        <p className="text-xl">
          {secundary}
        </p>
      </div>
      <div className="flex">
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="cyan" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="cyan" />
      </div>
    </div>
  );
}
