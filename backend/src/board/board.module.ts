import { Module } from '@nestjs/common';
import { BoardGateway } from './board.gateway';
import { BoardService } from './board.service';

@Module({
  providers: [BoardGateway, BoardService],
})
export class BoardModule {}
