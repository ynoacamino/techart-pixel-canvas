import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { BoardModule } from './board/board.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionsService } from './sessions/sessions.service';
import { SessionsModule } from './sessions/sessions.module';
import { SecretModule } from './secret/secret.module';
import configuration from './config/configuration';

@Module({
  imports: [
    BoardModule,
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    SessionsModule,
    ScheduleModule.forRoot(),
    SecretModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
