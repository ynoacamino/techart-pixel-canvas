'use client';

import { useUser } from '@/hooks/swr';
import { User } from '@/lib/models';
import { createContext, useContext } from 'react';

type ContextValue = {
  user?: User;
  isLoading: boolean;
  error?: Error;
  restoreCells: (mount: number) => void;
  reduceCells: () => void;
  setUpcomingCellsAt: (date: Date) => void;
  setClaimed: (claim: boolean) => void;
  setCellsAvailable: (mount: number) => void;
};

const AuthContext = createContext<ContextValue>({
  user: undefined,
  isLoading: true,
  error: undefined,
  restoreCells: () => {},
  reduceCells: () => {},
  setUpcomingCellsAt: () => {},
  setClaimed: () => {},
  setCellsAvailable: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const data = useUser();

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, type ContextValue as AuthContextValue, useAuth };
