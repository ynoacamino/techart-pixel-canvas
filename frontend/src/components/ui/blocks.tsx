import { cn } from '@/lib/utils';
import { Block, BlockProps } from './block';

interface BlocksProps extends BlockProps {
  cols: number;
  rows: number;
  className?: string;
}

function Blocks({
  size = 'md',
  cols,
  rows,
  color = 'blue',
  className,
}: BlocksProps) {
  return (
    <div
      className={cn(
        'grid gap-0.5',
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: cols * rows }, (_, index) => (
        <Block
          key={index}
          size={size}
          color={color}
          initialOpacity={Math.random()}
        />
      ))}
    </div>
  );
}

export { Blocks };
