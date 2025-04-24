import { Injectable, OnModuleInit } from '@nestjs/common';
import { Board } from './dto/cell.dto';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as cron from 'node-cron';

@Injectable()
export class BoardService implements OnModuleInit {
  private readonly size = 100;

  private board: Board;

  constructor() {
    this.loadBoard();
  }

  onModuleInit() {
    cron.schedule('*/5 * * * *', () => {
      this.saveBoard().catch((err) => console.error('Error al guardar el board:', err));
    });
  }


  private createEmptyBoard(): Board {
    return Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => '#FFFFFF'));
  }

  private async saveBoard(): Promise<void> {
    const backupDir = path.join(process.cwd(), 'backup');
    const backupPath = path.join(backupDir, `${Date.now()}.json`);

    await fs.mkdir(backupDir, { recursive: true });
    await fs.writeFile(backupPath, JSON.stringify(this.board));
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
    this.board = JSON.parse(data) as Board;
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
