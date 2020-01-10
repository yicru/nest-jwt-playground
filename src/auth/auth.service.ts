import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';
import { Admin } from '../admins/admin.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(
    username: string,
    pass: string,
  ): Promise<Omit<Admin, 'password'> | null> {
    const admin = await this.adminsService.findOne(username);

    if (admin && bcrypt.compareSync(pass, admin.password)) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Admin | User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
