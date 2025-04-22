'use client';

import { useColorPickerStore } from '@/components/providers/colorPicketProvider';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';

const COLORS = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#FF00FF',
];

export default function ColorPicker() {
  const currentColor = useColorPickerStore((state) => state.currentColor);
  const setCurrentColor = useColorPickerStore((state) => state.setCurrentColor);

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 rounded-lg bg-zinc-800 flex gap-4 py-4 px-4"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {
        COLORS.map((color, index) => (
          <motion.button
            type="button"
            key={index}
            onClick={() => setCurrentColor(color)}
            aria-label={color}
            className={cn('rounded-lg border-0 flex items-center justify-center cursor-pointer w-14 h-14 aspect-square')}
            style={{ backgroundColor: color }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.2 }}
            animate={{ scale: color === currentColor ? 1.2 : 1 }}
          />
        ))
      }
    </motion.div>
  );
}
