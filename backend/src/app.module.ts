import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionsService } from './sessions/sessions.service';
import { SessionsModule } from './sessions/sessions.module';
import configuration from './config/configuration';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BoardModule,
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration]
    }),
    AuthModule,
    UsersModule,
    SessionsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
