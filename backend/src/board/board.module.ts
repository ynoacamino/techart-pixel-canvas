import { Module } from '@nestjs/common';
import { BoardGateway } from './board.gateway';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  providers: [BoardGateway, BoardService],
  controllers: [BoardController]
})
export class BoardModule {}
