import { Module } from '@nestjs/common';
import { SessionsModule } from '@/sessions/sessions.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from '@/users/users.module';
import { BoardGateway } from './board.gateway';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  providers: [BoardGateway, BoardService],
  controllers: [BoardController],
  imports: [SessionsModule, PrismaModule, UsersModule],
})
export class BoardModule {}
