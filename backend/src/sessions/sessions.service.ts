import { Injectable } from '@nestjs/common';
import { addDays } from 'src/common/utils/date.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) { }
  
  async createSession({ userId, userAgent, ipAddress } : { userId: number,userAgent: string, ipAddress: string }) {
    return this.prisma.session.create({
      data: {
        userId,
        userAgent,
        ipAddress,
        sessionToken: crypto.randomUUID(),
        expiresAt: addDays(new Date(), 7),
      },
    });
  }
  
  async findSessionByToken(sessionToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });
  
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await this.revokeSession(session.id);
      }
      return null;
    }
  
    return session;
  }
  

  async revokeSession(sessionId: string) {
    return this.prisma.session.delete({
      where: { id: sessionId },
    });
  }

  async rotateSession(sessionId: string) {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        sessionToken: crypto.randomUUID(),
        expiresAt: addDays(new Date(), 7),
      },
    });
  }
}
