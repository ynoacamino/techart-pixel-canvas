import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { SessionsModule } from '@/sessions/sessions.module';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({ load: [configuration] }),
    SessionsModule,
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
