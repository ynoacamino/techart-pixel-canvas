import { useAuth } from '@/components/contexts/AuthProvider';
import { useEffect, useState } from 'react';

export default function Timer() {
  const { user } = useAuth();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }

    setTime((new Date(user.upcomingCellsAt)).getTime() - Date.now());
  }, [user]);

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
    <div className="text-2xl font-bold bg-white p-10 absolute top-6 right-6">
      <span>
        {formatTime(time)}

      </span>
      |||||
      <span>
        {
          user ? user.cellsAvailable : 'N/A'
        }
      </span>
    </div>
  );
}
