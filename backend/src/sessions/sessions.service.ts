import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addDays } from '@/common/utils/date.utils';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) { }

  async createSession(
    { userId, userAgent, ipAddress } : { userId: number, userAgent?: string, ipAddress?: string },
  ) {
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

  async getSessionByToken(sessionToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { sessionToken },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        return this.refreshSession(session.id);
      }
      return null;
    }

    return session;
  }

  async getUserBySessionToken(sessionToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });
    return session?.user;
  }

  async revokeSession(sessionId: string) {
    return this.prisma.session.delete({
      where: { id: sessionId },
    });
  }

  async refreshSession(sessionId: string) {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        sessionToken: crypto.randomUUID(),
        expiresAt: addDays(new Date(), 7),
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupExpiredSessions() {
    return this.prisma.session.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}
