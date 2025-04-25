import { Module } from '@nestjs/common';
import { BoardGateway } from './board.gateway';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { SessionsModule } from 'src/sessions/sessions.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [BoardGateway, BoardService],
  controllers: [BoardController],
  imports: [SessionsModule, PrismaModule],
})
export class BoardModule {}
