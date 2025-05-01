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
    height: 70,
  },
  {
    height: 150,
  },
  {
    height: 180,
  },
  {
    height: 120,
  },
  {
    height: 100,
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
    <masonry-layout maxcolwidth="300" gap="8" className="px-2 mt-15">
      {
        images
          ? (images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt="Elemento de galería"
              className="rounded-md object-cover mb-2"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 100 }}
              transition={{ delay: 0.5, duration: 1000 }}
            />
          )))
          : (templates.map((template, index) => (
            <motion.div
              key={index}
              className="rounded-lg bg-zinc-500 mb-2"
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
