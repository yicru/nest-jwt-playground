import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      username: createUserDTO.username,
      email: createUserDTO.email,
      password: UsersService.hashPassword(createUserDTO.password),
    });
    await this.userRepository.save(user);
    return user;
  }

  private static hashPassword(password: string): string {
    return bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS, 10) || 10,
    );
  }
}
