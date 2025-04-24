import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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
    return this.prisma.user.create({
      data: {
        name: data.name,
        avatar: data.avatar,
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
        lastGivenAt: data.lastGivenAt
      }
    });
  }
}
