import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomMap(length: number, amount: number): boolean[] {
  const map = new Array<boolean>(length).fill(false);
  let count = 0;
  while (count < amount) {
    const index = Math.floor(Math.random() * length);
    if (!map[index]) {
      map[index] = true;
      count += 1;
    }
  }
  return map;
}
