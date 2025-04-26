import { api } from '@/lib/api';
import { User } from '@/lib/models';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>();
  const { data, error } = useSWR<User, Error>('/api/auth/me', () => api.getUser());

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const reduceCells = () => {
    setUser((prevUser) => {
      if (!prevUser) return undefined;
      return {
        ...prevUser,
        cellsAvailable: prevUser.cellsAvailable - 1,
      };
    });
  };

  const setUpcomingCellsAt = (date: Date) => {
    if (user) {
      setUser({
        ...user,
        upcomingCellsAt: date,
      });
    }
  };

  const setClaimed = (claim: boolean) => {
    if (user) {
      setUser({
        ...user,
        claimed: claim,
      });
    }
  };

  const restoreCells = (mount: number) => {
    if (user) {
      setUser({
        ...user,
        cellsAvailable: mount,
      });
    }
  };

  const setCellsAvailable = (mount: number) => {
    setUser((prevUser) => {
      if (!prevUser) return undefined;
      return {
        ...prevUser,
        cellsAvailable: mount,
      };
    });
  };

  return {
    user,
    isLoading: !error && !data,
    error,
    restoreCells,
    reduceCells,
    setUpcomingCellsAt,
    setClaimed,
    setCellsAvailable,
  };
};
