'use client';

import ModalSignIn from '@/components/auth/ModalSignIn';
import { Blocks } from '@/components/ui/blocks';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { BACKEND_URL } from '@/config/variables';
import { User } from '@/lib/models';

interface HeroProps {
  user?: User
}

export default function Hero({
  user,
}: HeroProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className="flex-1 basis-md flex flex-col gap-y-10 items-center justify-center relative">
      <h1 className="text-5xl font-bold text-center uppercase">
        Tech Art
      </h1>
      {
        user ? (
          <Button size="lg" className="text-xl animate-bounce" asChild>
            <Link href="/board">
              ¡Pintemos!
            </Link>
          </Button>
        ) : (
          <ModalSignIn>
            <Button size="lg" className="text-xl animate-bounce" asChild>
              <Link href={`${BACKEND_URL}/auth/google/login`}>
                ¡Pintemos!
              </Link>
            </Button>
          </ModalSignIn>
        )
      }
      <div className="flex gap-0.5 absolute bottom-1/2 translate-y-44">
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="blue" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="green" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="pink" />
      </div>
      <div className="flex gap-0.4 absolute top-1/2 -translate-y-44">
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="purple" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="red" />
        <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="yellow" />
      </div>
      <Blocks cols={2} rows={7} ratio={1.5} color="cyan" className="hidden md:grid absolute right-0 translate-x-38" />
      <Blocks cols={2} rows={7} ratio={1.5} color="orange" className="hidden md:grid absolute left-0 -translate-x-38" />
    </div>
  );
}
