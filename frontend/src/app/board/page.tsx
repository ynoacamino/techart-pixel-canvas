'use client';

import { useAuth } from '@/components/contexts/AuthProvider';
import Board from '@/components/pages/canvas/board';
import ColorPicker from '@/components/pages/canvas/colorPicker';
import Timer from '@/components/pages/canvas/timer';
import Zoom from '@/components/ui/zoom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.setItem('isRedirectToLogin', 'true');
      router.push('/');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) return null;
  return (
    <>
      <Zoom>
        <div className="w-screen h-screen bg-zinc-300 flex items-center justify-center">
          <Board />
        </div>
      </Zoom>
      <ColorPicker />
      <Timer />
    </>
  );
}
