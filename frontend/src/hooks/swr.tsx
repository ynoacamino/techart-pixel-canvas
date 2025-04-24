import { api } from '@/lib/api';
import { User } from '@/lib/models';
import useSWR from 'swr';

export const useUser = () => {
  const { data, error } = useSWR<User, Error>('/api/auth/me', () => api.getUser());

  return {
    user: data,
    isLoading: !error && !data,
    error,
  };
};
