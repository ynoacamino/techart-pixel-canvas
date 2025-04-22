import { BACKEND_URL } from '@/config/variables';
import { useBoard } from '@/hooks/useBoard';
import { io } from 'socket.io-client';
import { useColorPickerStore } from '@/components/providers/colorPicketProvider';

const socket = io(BACKEND_URL);

export default function Board() {
  const { board, changeColor } = useBoard(socket);
  const currentColor = useColorPickerStore((state) => state.currentColor);

  return (
    <div className="w-screen md:w-[100vh] aspect-square bg-gray-100 grid grid-cols-1">
      {
        board.map((row, i) => (
          <div className="grid grid-cols-100 w-full" key={i}>
            {row.map((color, j) => (
              <button
                key={`${i}-${j}`}
                type="button"
                className="aspect-square"
                style={{ backgroundColor: color }}
                onClick={() => changeColor({ x: j, y: i, color: currentColor })}
              >
                <span className="sr-only">
                  {i}
                  {j}
                </span>
              </button>
            ))}
          </div>
        ))
      }
    </div>
  );
}
