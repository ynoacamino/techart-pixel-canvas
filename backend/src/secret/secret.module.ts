import { Module } from '@nestjs/common';
import { SecretService } from './secret.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { SecretController } from './secret.controller';
import { SessionsModule } from '@/sessions/sessions.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [PrismaModule, SessionsModule, UsersModule],
  providers: [SecretService],
  exports: [SecretService],
  controllers: [SecretController],
})
export class SecretModule {}
