import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SessionsService } from 'src/sessions/sessions.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) { }
  
  async validateUser({ email, name, avatar }): Promise<User> {
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.createUser({ email, name, avatar });
    }
    return user;
  }
}
