'use client';

import useScrollMove from '@/hooks/useScrollMove';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import {
  motion,
  useMotionTemplate,
} from 'motion/react';
import { useEffect, useState } from 'react';

export const blockVariants = cva(
  'rounded-md transition-opacity duration-500',
  {
    variants: {
      color: {
        blue: 'bg-blue-500 shadow-blue-500',
        red: 'bg-red-500 shadow-red-500',
        green: 'bg-green-500 shadow-green-500',
        yellow: 'bg-yellow-500 shadow-yellow-500',
        purple: 'bg-purple-500 shadow-purple-500',
        pink: 'bg-pink-500 shadow-pink-500',
        orange: 'bg-orange-500 shadow-orange-500',
        cyan: 'bg-cyan-500 shadow-cyan-500',
        transparent: 'bg-transparent',
      },
      size: {
        sm: 'size-4',
        md: 'size-6',
        lg: 'size-8',
      },
    },
    defaultVariants: {
      color: 'transparent',
      size: 'md',
    },
  },
);

function Block({
  size,
  color,
}: VariantProps<typeof blockVariants>) {
  const [opacity, setOpacity] = useState<number>(0);
  const shadowSize = useScrollMove<number>([8, 50]);
  const boxShadow = useMotionTemplate`0 0 ${shadowSize}px var(--tw-shadow-color)`;
  useEffect(() => {
    if (color === 'transparent') {
      return () => {};
    }
    setOpacity(Math.random());
    const interval = setInterval(() => {
      setOpacity((prev) => {
        if (prev >= 1) {
          return 0;
        }
        return prev + 0.2;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [color]);
  return (
    <motion.div
      className={cn(blockVariants({ color, size }))}
      style={{
        opacity,
        boxShadow,
      }}
    />
  );
}

export { Block };
