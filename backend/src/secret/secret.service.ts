import { addMinutes } from '@/common/utils/date.utils';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretService {
  constructor(private prisma: PrismaService) { }

  async createToken(userId: number) {
    const token = crypto.randomUUID();
    const expiresAt = addMinutes(new Date(), 5);

    await this.prisma.secret.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
    return token;

  }

  async validateToken(userId: number, token: string) {
    const entry = await this.prisma.secret.findUnique({
      where: {
        token,
      },
    });

    if (
      !entry
      || entry.userId !== userId
      || entry.isUsed
      || entry.expiresAt < new Date()
    ) {
      return false;
    }

    await this.prisma.secret.update({
      where: {
        token,
      },
      data: {
        isUsed: true,
      },
    });
    return true;
  }

}
