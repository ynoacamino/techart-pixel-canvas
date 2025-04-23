import { Injectable } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }
  
  async validateUser(email: string): Promise<User> {
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.createUser({ email });
    }
    return user;
  }
}
