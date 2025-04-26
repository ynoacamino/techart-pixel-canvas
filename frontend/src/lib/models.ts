export interface User {
  id: number;
  name: string;
  email: string;
  role: 'auth' | 'admin';
  avatar: string;
  cellsAvailable: number;
  upcomingCellsAt: Date;
  claimed: boolean;
}
