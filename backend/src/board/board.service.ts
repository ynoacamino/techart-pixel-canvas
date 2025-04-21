import { Injectable } from '@nestjs/common';
import { Board } from './dto/cell.dto';

@Injectable()
export class BoardService {
  private readonly size = 10;

  private board: Board;

  constructor() {
    this.board = this.createEmptyBoard();
  }

  private createEmptyBoard(): Board {
    return Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => '#FFFFFF'));
  }

  getBoard(): Board {
    return this.board;
  }

  updateCell(x: number, y: number, color: string): void {
    if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
      this.board[y][x] = color;
    }
  }
}
