'use client';

import { cn, generateRandomMap } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import { Block, blockVariants } from './block';

interface BlocksProps extends VariantProps<typeof blockVariants> {
  cols: number;
  rows: number;
  ratio?: number;
  className?: string;
}

function Blocks({
  size = 'md',
  cols,
  rows,
  color = 'blue',
  ratio = 1,
  className,
}: BlocksProps) {
  const [blocksMap, setBlocksMap] = useState<boolean[]>(new Array(cols * rows).fill(false));

  useEffect(() => {
    setBlocksMap(generateRandomMap(cols * rows, Math.ceil((cols * rows) / ratio) % (cols * rows)));
  }, [cols, rows, ratio]);
  return (
    <div
      className={cn(
        'grid gap-1',
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {blocksMap.map((drawHere, index) => (
        <Block
          key={index}
          size={size}
          color={drawHere ? color : 'transparent'}
        />
      ))}
    </div>
  );
}

export { Blocks };
