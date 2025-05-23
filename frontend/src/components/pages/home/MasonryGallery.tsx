'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GalleryProps {
  images?: string[];
}

const templates = [
  {
    height: 200,
  },
  {
    height: 220,
  },
  {
    height: 150,
  },
];

export default function MasonryGallery({
  images,
}: GalleryProps) {
  const [, setMasonryLoading] = useState(true);
  useEffect(() => {
    import('@appnest/masonry-layout').then(() => {
      setMasonryLoading(false);
    });
  }, []);
  return (
    <masonry-layout maxcolwidth="300" gap="8" className="mt-15 max-w-7xl w-full">
      {
        images
          ? (images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt="Elemento de galería"
              className="rounded-md object-cover mb-2"
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ amount: 0.1, once: true }}
            />
          )))
          : (templates.map((template, index) => (
            <motion.div
              key={index}
              className="rounded-lg bg-zinc-400/50 mb-2"
              style={{
                height: template.height,
              }}
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ amount: 0.1 }}
            />
          )))
      }
    </masonry-layout>
  );
}
