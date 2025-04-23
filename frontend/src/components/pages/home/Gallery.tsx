'use client';

import { cn } from '@/lib/utils';

interface GalleryProps {
  side: 'left' | 'right' | 'bottom';
  images?: string[];
}

const templates = [
  {
    height: 200,
  },
  {
    height: 70,
  },
  {
    height: 150,
  },
  {
    height: 120,
  },
  {
    height: 100,
  },
];

export default function Gallery({
  side, images,
}: GalleryProps) {
  return (
    <div
      className={cn(
        'hidden lg:flex absolute w-1/5 h-max flex-col gap-y-2 py-2 top-0 overflow-hidden',
        side === 'left' ? 'left-2' : 'right-2',
      )}
    >
      {
        images
          ? (
            images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Elemento de galería"
                className={cn(
                  'rounded-md object-cover',
                  side === 'left' ? 'animate-slide-left' : 'animate-slide-right',
                )}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              />
            ))
          ) : (
            templates.map((template, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-lg bg-gray-400 animate-pulse',
                  side === 'left' ? 'animate-slide-left' : 'animate-slide-right',
                )}
                style={{
                  height: `${template.height}px`,
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))
          )
      }
    </div>
  );
}
