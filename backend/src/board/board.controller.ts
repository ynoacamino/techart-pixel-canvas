import { Controller, Get } from '@nestjs/common';
import { Board } from './dto/cell.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getBoards(): Board {
    return this.boardService.getBoard();
  }
}
