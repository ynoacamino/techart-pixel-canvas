'use client';

import useScrollMove from '@/hooks/useScrollMove';
import {
  motion,
  useMotionTemplate,
} from 'motion/react';

function BarScroll({
  side = 'left',
}: { side?: 'left' | 'right' }) {
  const maskPercent = useScrollMove<string>(['2%', '4%']);
  const maskImage = useMotionTemplate`
    radial-gradient(ellipse ${maskPercent} 70% at ${side} center, black 0.5%, transparent)
  `;
  return (
    <motion.div
      className="fixed inset-0
      bg-[linear-gradient(to_bottom,var(--color-blue-500),var(--color-yellow-500),var(--color-red-500),var(--color-green-500))]"
      style={{
        maskImage,
      }}

    />
  );
}

export { BarScroll };
