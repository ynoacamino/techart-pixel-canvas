import { BACKEND_URL } from '@/config/variables';
import { useBoard } from '@/hooks/useBoard';
import { io } from 'socket.io-client';

const socket = io(BACKEND_URL);

export default function Board() {
  const { board, changeColor } = useBoard(socket);

  return (
    <div className="w-screen md:w-[100vh] aspect-square bg-gray-100 grid grid-cols-1">
      {
        board.map((row, i) => (
          <div className="grid grid-cols-100 w-full" key={i}>
            {row.map((color, j) => (
              <button
                key={`${i}-${j}`}
                type="button"
                className="aspect-square hover:bg-zinc-500"
                style={{ backgroundColor: color }}
                onClick={() => changeColor({ x: j, y: i, color: '#000000' })}
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
