import { Injectable, OnModuleInit } from '@nestjs/common';
import { Board } from './dto/cell.dto';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardService {
  private readonly size = 100;

  private board: Board;

  constructor(
    private readonly prismaService: PrismaService,
  ) {
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
