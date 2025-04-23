'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const sizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
} as const;

const colorClasses = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
  cyan: 'bg-cyan-500',
  transparent: 'bg-transparent',
};

interface BlockProps {
  size?: keyof typeof sizeClasses;
  color?: keyof typeof colorClasses;
}

function Block({
  size = 'md',
  color = 'transparent',
}: BlockProps) {
  const [opacity, setOpacity] = useState<number>(0);
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
    <div
      className={cn(
        'rounded-md transition-opacity duration-500',
        sizeClasses[size],
        colorClasses[color],
      )}
      style={{
        opacity,
      }}
    />
  );
}

export { Block, type BlockProps };
