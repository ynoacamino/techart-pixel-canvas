'use client';

import { useColorPickerStore } from '@/components/providers/colorPicketProvider';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';

const COLORS = [
  '#fb2c36',
  '#ff6900',
  '#f0b100',
  '#00c950',
  '#7ccf00',
  '#00FFFF',
  '#0092b8',
  '#155dfc',
  '#7f22fe',
  '#e12afb',
  '#fafafa',
  '#0a0a0a',
];

export default function ColorPicker() {
  const currentColor = useColorPickerStore((state) => state.currentColor);
  const setCurrentColor = useColorPickerStore((state) => state.setCurrentColor);

  return (
    <motion.div
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 rounded-lg bg-zinc-900 flex gap-6 p-3 "
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div
        className="rounded-sm flex items-center justify-center w-16 h-15 md:h-9"
        style={{ backgroundColor: currentColor }}
        aria-label={currentColor}
      />
      <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
        {
        COLORS.map((color, index) => (
          <motion.button
            type="button"
            key={index}
            onClick={() => setCurrentColor(color)}
            aria-label={color}
            className={cn('rounded-xs md:rounded-sm border-0 flex items-center justify-center cursor-pointer h-6 w-6 md:w-9 md:h-9 aspect-square')}
            style={{ backgroundColor: color }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.15 }}
            // animate={{ scale: color === currentColor ? 1.2 : 1 }}
          />
        ))
      }
      </div>
    </motion.div>
  );
}
