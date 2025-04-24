import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionsService } from './sessions.service';

@Module({
  imports: [PrismaModule],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
