import { create } from 'zustand';

interface CellState {
  upcomingCellsAt: string;
  claimed: boolean;
  cellsAvailable: number;
  setUpcomingCellsAt: (date: string) => void;
  setClaimed: (claimed: boolean) => void;
  setCellsAvailable: (available: number) => void;
}

export const useCellStore = create<CellState>((set) => ({
  cellsAvailable: 0,
  claimed: true,
  upcomingCellsAt: '',
  setUpcomingCellsAt: (date: string) => set({ upcomingCellsAt: date }),
  setClaimed: (claimed: boolean) => set({ claimed }),
  setCellsAvailable: (available: number) => set({ cellsAvailable: available }),
}));
