import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { BoardModule } from './board/board.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    BoardModule, PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
