import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('admin-local'))
  @Post('/admin/login')
  async loginAdmin(@Request() req) {
    return this.authService.loginAdmin(req.user);
  }

  @UseGuards(AuthGuard('user-local'))
  @Post('/login')
  async loginUser(@Request() req) {
    return this.authService.loginUser(req.user);
  }
}
