'use client';

import Board from '@/components/pages/canvas/board';
import ColorPicker from '@/components/pages/canvas/colorPicker';
import Zoom from '@/components/ui/zoom';

export default function Home() {
  return (
    <>
      <Zoom>
        <div className="w-screen h-screen bg-zinc-300 flex items-center justify-center">
          <Board />
        </div>
      </Zoom>
      <ColorPicker />
    </>
  );
}
