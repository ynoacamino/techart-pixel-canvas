import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Board } from './dto/cell.dto';
import configuration from '@/config/configuration';

@Injectable()
export class BoardService {
  private readonly size = configuration().BOARD_SIZE;

  private board: Board;

  constructor() {
    this.loadBoard();
  }

  private createEmptyBoard(): Board {
    return Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => '#FFFFFF'));
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async saveBoard(): Promise<void> {
    const backupDir = path.join(process.cwd(), 'backup');
    const backupPath = path.join(backupDir, `${Date.now()}.json`);

    try {
      await fs.mkdir(backupDir, { recursive: true });
      await fs.writeFile(backupPath, JSON.stringify(this.board));
    } catch (error) {
      console.error('Error saving board:', error);
    }
  }

  private async loadBoard(): Promise<void> {
    const backupDir = path.join(process.cwd(), 'backup');
    await fs.mkdir(backupDir, { recursive: true });
    const files = await fs.readdir(backupDir);

    if (files.length === 0) {
      this.board = this.createEmptyBoard();
      return;
    }

    const latestFile = files.sort((a, b) => parseInt(b) - parseInt(a))[0];
    const backupPath = path.join(backupDir, latestFile);

    const data = await fs.readFile(backupPath, 'utf8');

    const savedBoard = JSON.parse(data) as Board;

    if (savedBoard.length < this.size) {
      const resizeBoard = Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => '#FFFFFF')) as Board;

      resizeBoard.forEach((row, i) => {
        row.forEach((_, j) => {
          if (i < savedBoard.length && j < savedBoard.length) {
            resizeBoard[i][j] = savedBoard[i][j];
          }
        })
      })

      this.board = resizeBoard;
      return;
    }

    this.board = savedBoard;
    return;
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
