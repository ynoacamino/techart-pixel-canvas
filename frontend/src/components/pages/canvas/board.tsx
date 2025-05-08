'use client';

import { BACKEND_URL } from '@/config/variables';
import { useBoard } from '@/hooks/useBoard';
import { io } from 'socket.io-client';
import { useColorPickerStore } from '@/components/providers/colorPicketProvider';
import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, CELL_SIZE } from '@/config/board';
import { useCellStore } from '@/components/providers/cellProvider';
import useButtonFound from '@/hooks/useButtonFound';

const socket = io(BACKEND_URL, {
  withCredentials: true,
});

const cornerStencil = [
  [1, 1, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 1],
];

export default function Board() {
  const [ctrlClicked, setCtrlClicked] = useState(false);

  const { board, changeColor } = useBoard(socket);
  const { handleClick: handleSecret } = useButtonFound();
  const currentColor = useColorPickerStore((state) => state.currentColor);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsAvailable = useCellStore((store) => store.cellsAvailable);

  const [hoveredCell, setHoveredCell] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || board.length === 0) return;

    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        ctx.fillStyle = board[y]?.[x] || '#ffffff';
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }, [board]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        setCtrlClicked(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey) {
        setCtrlClicked(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (ctrlClicked) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);

    changeColor({ x, y, color: currentColor });

    if (x === BOARD_SIZE - 1 && y === BOARD_SIZE / 2) {
      handleSecret();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);

    setHoveredCell((prev) => {
      if (prev?.x === x && prev?.y === y) return prev;
      return { x, y };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || board.length === 0) return;

    ctx.imageSmoothingEnabled = false;

    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        ctx.fillStyle = board[y][x];
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
    if (cellsAvailable === 0) return;
    if (hoveredCell && ctx) {
      const { x, y } = hoveredCell;
      const baseX = x * CELL_SIZE;
      const baseY = y * CELL_SIZE;

      for (let dy = 0; dy < 8; dy += 1) {
        for (let dx = 0; dx < 8; dx += 1) {
          if (cornerStencil[dy][dx] === 1) {
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fillRect(baseX + dx, baseY + dy, 1, 1);
          }
        }
      }
    }
  }, [board, hoveredCell]);

  return (
    <div className="w-screen md:w-[100vh] aspect-square bg-gray-100 grid grid-cols-1">
      <canvas
        ref={canvasRef}
        width={CELL_SIZE * BOARD_SIZE}
        height={CELL_SIZE * BOARD_SIZE}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCell(null)}
        className="border border-gray-300 w-full aspect-square cursor-pointer"
      />
    </div>
  );
}
