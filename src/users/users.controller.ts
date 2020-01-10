import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('user'))
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('admin'))
  @Get('/')
  async getUsers() {
    return await this.usersService.findAll();
  }
}
