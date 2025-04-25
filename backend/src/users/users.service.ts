import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { CELLS_AVAILABLE } from '@/config/configuration';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: { email: string, name: string, avatar: string }): Promise<User> {
    const isAdmin = await this.prisma.adminEmail.findUnique({
      where: { email: data.email },
    });
    return this.prisma.user.create({
      data: {
        name: data.name,
        avatar: data.avatar,
        role: isAdmin ? Role.admin : Role.auth,
        email: data.email,
        cellsAvailable: CELLS_AVAILABLE,
        upcomingCellsAt: new Date(),
        claimed: true,
      },
    });
  }

  async updateUser(id: number, data: {
    cellsAvailable?: number,
    upcomingCellsAt?: Date,
    claimed?: boolean,
    name?: string,
    avatar?: string
  }): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        cellsAvailable: data.cellsAvailable,
        upcomingCellsAt: data.upcomingCellsAt,
        claimed: data.claimed,
        name: data.name,
        avatar: data.avatar,
      },
    });
  }
}
