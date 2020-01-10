import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard('user'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
