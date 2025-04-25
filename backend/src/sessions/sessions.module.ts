import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { SessionsService } from '@/sessions/sessions.service';

@Module({
  imports: [PrismaModule],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
