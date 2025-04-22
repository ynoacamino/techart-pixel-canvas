'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface BlockProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'transparent';
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

const colorClasses = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  transparent: 'bg-transparent',
};

function Block({
  size = 'md',
  color = 'transparent',
}: BlockProps) {
  const [opacity, setOpacity] = useState<number>(0);
  useEffect(() => {
    if (color === 'transparent') {
      return () => {};
    }
    setOpacity(Math.random() * 0.5 + 0.5);
    const interval = setInterval(() => {
      setOpacity((prev) => {
        if (prev >= 1) {
          return 0.5;
        }
        return prev + 0.1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [color]);
  return (
    <div
      className={cn(
        'rounded-md transition-all',
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
