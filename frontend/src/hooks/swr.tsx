import { useCellStore } from '@/components/providers/cellProvider';
import { api } from '@/lib/api';
import { User } from '@/lib/models';
import { useEffect } from 'react';
import useSWR from 'swr';

export const useUser = () => {
  const { data, error, isLoading } = useSWR<User, Error>('/api/auth/me', () => api.getUser());

  const setCellsAvailable = useCellStore((state) => state.setCellsAvailable);
  const setClaimed = useCellStore((state) => state.setClaimed);
  const setUpcomingCellsAt = useCellStore((state) => state.setUpcomingCellsAt);
  const setRole = useCellStore((state) => state.setRole);

  useEffect(() => {
    if (!isLoading && data) {
      setClaimed(data.claimed);
      setUpcomingCellsAt(data.upcomingCellsAt);
      setRole(data.role);
      if (data.role === 'admin') {
        setCellsAvailable(Infinity);
      } else {
        setCellsAvailable(data.cellsAvailable);
      }
    }
  }, [isLoading]);

  return {
    user: data,
    isLoading: !error && !data,
    error,
  };
};
