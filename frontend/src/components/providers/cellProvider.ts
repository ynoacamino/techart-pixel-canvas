import { create } from 'zustand';

interface CellState {
  upcomingCellsAt: string;
  claimed: boolean;
  cellsAvailable: number;
  role: 'auth' | 'admin';
  setRole: (role: 'auth' | 'admin') => void;
  setUpcomingCellsAt: (date: string) => void;
  setClaimed: (claimed: boolean) => void;
  setCellsAvailable: (available: number) => void;
}

export const useCellStore = create<CellState>((set) => ({
  cellsAvailable: 0,
  claimed: true,
  upcomingCellsAt: '',
  role: 'auth',
  setRole: (role: 'auth' | 'admin') => set({ role }),
  setUpcomingCellsAt: (date: string) => set({ upcomingCellsAt: date }),
  setClaimed: (claimed: boolean) => set({ claimed }),
  setCellsAvailable: (available: number) => set({ cellsAvailable: available }),
}));
