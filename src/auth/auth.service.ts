import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
