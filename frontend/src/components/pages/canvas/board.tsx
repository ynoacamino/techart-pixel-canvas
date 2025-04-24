import { BACKEND_URL } from '@/config/variables';
import { useBoard } from '@/hooks/useBoard';
import { io } from 'socket.io-client';
import { useColorPickerStore } from '@/components/providers/colorPicketProvider';
import { useEffect, useRef } from 'react';
import { BOARD_SIZE, CELL_SIZE } from '@/config/board';

const socket = io(BACKEND_URL);

export default function Board() {
  const { board, changeColor } = useBoard(socket);
  const currentColor = useColorPickerStore((state) => state.currentColor);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || board.length === 0) return; // <- validación importante
    // ctx.imageSmoothingEnabled = false;
    // ctx.filter = 'none';

    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        ctx.fillStyle = board[y]?.[x] || '#ffffff';
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }, [board]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);

    changeColor({ x, y, color: currentColor });
  };

  return (
    <div className="w-screen md:w-[100vh] aspect-square bg-gray-100 grid grid-cols-1">
      <canvas
        ref={canvasRef}
        width={CELL_SIZE * BOARD_SIZE}
        height={CELL_SIZE * BOARD_SIZE}
        onClick={handleClick}
        className="border border-gray-300 w-full aspect-square cursor-pointer"
      />
    </div>
  );
}
