import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto';

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

  @UseGuards(AuthGuard('admin'))
  @Post('/')
  async createUsers(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.findByEmail(createUserDTO.email);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: [
            {
              property: 'email',
              constraints: {
                unique: 'Email Address already used',
              },
            },
          ],
        },
        400,
      );
    }
    return await this.usersService.createUser(createUserDTO);
  }
}
