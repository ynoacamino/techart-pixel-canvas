import { create } from 'zustand';

interface ColorPickerState {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

export const useColorPickerStore = create<ColorPickerState>((set) => ({
  currentColor: '#fb2c36',
  setCurrentColor: (color) => set({ currentColor: color }),
}));
