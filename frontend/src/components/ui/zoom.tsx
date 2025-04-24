'use client';

import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export default function Zoom({ children }: { children: React.ReactNode }) {
  return (
    <TransformWrapper
      wheel={{ step: 0.2 }}
      doubleClick={{ disabled: true }}
      panning={{ activationKeys: ['Control'] }}
    >
      <TransformComponent>
        {children}
      </TransformComponent>
    </TransformWrapper>
  );
}
