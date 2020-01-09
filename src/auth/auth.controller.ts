import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login/local')
  async localLogin(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login/jwt')
  async jwtLogin(@Request() req) {
    return this.authService.login(req.user);
  }
}
