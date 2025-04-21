'use client';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const NUM_COLS = 100;
const NUM_ROWS = 100;

export default function Home() {
  return (
    <TransformWrapper
      wheel={{ step: 0.2, activationKeys: ['Control'] }}
      doubleClick={{ disabled: true }}
      panning={{ activationKeys: ['Control'] }}
    >
      <TransformComponent>
        <div className="w-screen h-screen bg-zinc-300 flex items-center justify-center">

          <div className="w-screen md:w-[100vh] aspect-square bg-gray-100 grid grid-cols-1">
            {
          Array.from({ length: NUM_ROWS }).map((_, i) => (
            // eslint-disable-next-line
            <div className="grid grid-cols-100 w-full" key={i}>
              {Array.from({ length: NUM_COLS }).map((__, j) => (
                // eslint-disable-next-line
                <div key={`${i}-${j}`} className="bg-white aspect-square hover:bg-zinc-200" />
              ))}
            </div>
          ))
        }
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
