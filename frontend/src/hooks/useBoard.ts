import { BOARD_SIZE } from '@/config/board';
import { BACKEND_URL } from '@/config/variables';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { toast } from 'sonner';

export const useBoard = (socket: Socket) => {
  const [board, setBoard] = useState<string[][]>([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/board`);
        const data = await response.json();
        setBoard(data);
      } catch (error) {
        toast.error('Failed to fetch board');
      }
    };

    fetchBoard()
      .then(() => {
        socket.on('cell_updated', ({ x, y, color }: { x: number; y: number; color: string }) => {
          setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            newBoard[y][x] = color;
            return newBoard;
          });
        });
      });

    return () => {
      socket.off('board_init');
      socket.off('cell_updated');
    };
  }, []);

  const changeColor = ({ x, y, color }: { x: number, y: number, color: string }) => {
    if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) return;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[y][x] = color;
      return newBoard;
    });
    socket.emit('cell_clicked', { x, y, color });
  };

  return {
    board,
    changeColor,
  };
};
