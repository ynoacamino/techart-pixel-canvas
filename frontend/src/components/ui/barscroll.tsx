'use client';

import {
  motion,
  useMotionTemplate,
  useScroll, useSpring, useTransform, useVelocity,
} from 'motion/react';

function BarScroll({
  side = 'left',
}: { side?: 'left' | 'right' }) {
  const { scrollYProgress } = useScroll();
  const rawVelocity = useVelocity(scrollYProgress);
  const absVelocity = useTransform(rawVelocity, (v) => Math.abs(v));
  const smoothVelocity = useSpring(absVelocity, {
    damping: 120,
    stiffness: 200,
  });
  const maskPercent = useTransform<number, string>(smoothVelocity, [0, 1], ['2%', '4%']);
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
