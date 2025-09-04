'use client';

import { Blocks } from '@/components/ui/blocks';
import { motion } from 'motion/react';
import { useMediaQuery } from 'react-responsive';

const VIDEO_URL = 'https://ynoa-uploader.ynoacamino.me/uploads/1749780865_timelapse.mp4';

export default function FinalVideo() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className="flex flex-col gap-20 mt-40">
      <div className="flex flex-col items-center justify-center gap-y-8 my-20 relative">
        <h2 className="text-5xl lg:text-6xl font-bold text-center">
          Mira el resultado final
        </h2>
        <div className="flex gap-0.5 absolute bottom-1/2 translate-y-36">
          <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="blue" />
          <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="green" />
          <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="pink" />
        </div>
        <div className="flex gap-0.5 absolute top-1/2 -translate-y-36">
          <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="purple" />
          <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="red" />
          <Blocks cols={isMobile ? 4 : 5} rows={2} ratio={1.5} color="yellow" />
        </div>
        <Blocks cols={2} rows={7} ratio={1.5} color="cyan" className="hidden md:grid absolute translate-x-96" />
        <Blocks cols={2} rows={7} ratio={1.5} color="orange" className="hidden md:grid absolute -translate-x-96" />
      </div>
      <motion.video
        src={VIDEO_URL}
        className="w-full max-w-2xl"
        controls
        autoPlay
        loop
        muted
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
