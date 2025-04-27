import { useCellStore } from '@/components/providers/cellProvider';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [lastUpcomingCellsAt, setLastUpcomingCellsAt] = useState('');

  const cellsAvailable = useCellStore((state) => state.cellsAvailable);
  const claimed = useCellStore((state) => state.claimed);
  const upcomingCellsAt = useCellStore((state) => state.upcomingCellsAt);

  useEffect(() => {
    if (upcomingCellsAt !== lastUpcomingCellsAt) {
      setLastUpcomingCellsAt(upcomingCellsAt);
      setTime(new Date(upcomingCellsAt).getTime() - Date.now());
    }
  }, [upcomingCellsAt]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds: number) => {
    if (milliseconds <= 0) {
      return '00:00';
    }
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="absolute top-3 right-3 md:top-6 md:right-6 text-primary-foreground font-bold gap-4 flex text-lg md:text-2xl">

      <AnimatePresence initial={false}>
        {!claimed ? (
          <motion.div
            className="bg-zinc-800 rounded-md py-3 px-5 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            key="box"
          >
            <span className="text-xs md:text-sm">
              Proximos:
            </span>
            <span>
              {formatTime(time)}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="bg-zinc-800 rounded-md py-3 px-5 flex flex-col items-center justify-center">
        <span className="text-sm">
          Disponibles:
        </span>
        <span>
          {cellsAvailable}
        </span>
      </div>
    </div>
  );
}
