import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';
import { Admin } from '../admins/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(
    username: string,
    pass: string,
  ): Promise<Omit<Admin, 'password'> | null> {
    const admin = await this.adminsService.findOne(username);

    if (admin && admin.password === pass) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(admin: Admin) {
    const payload = { username: admin.username, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
