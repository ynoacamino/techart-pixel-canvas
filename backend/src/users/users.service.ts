import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async createUser(data: { email: string, name: string, avatar: string }): Promise<User> {
    const isAdmin = await this.prisma.adminEmail.findUnique({
      where: { email: data.email }
    });
    return this.prisma.user.create({
      data: {
        name: data.name,
        avatar: data.avatar,
        role: isAdmin ? Role.admin : Role.auth,
        email: data.email,
        cellsAvailable: 10,
        lastGivenAt: new Date()
      }
    });
  }

  async updateUser(id: number, data: {
    cellsAvailable?: number,
    lastGivenAt?: Date
    name?: string,
    avatar?: string
  }): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        cellsAvailable: data.cellsAvailable,
        lastGivenAt: data.lastGivenAt,
        name: data.name,
        avatar: data.avatar,
      }
    });
  }
}
