import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule.forRoot({ load: [configuration] })],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
