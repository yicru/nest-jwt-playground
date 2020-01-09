import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';

@Injectable()
export class AdminsService {
  private readonly admins: Admin[];

  constructor() {
    this.admins = [
      {
        id: 1,
        username: 'admin',
        password: 'secret',
      },
    ];
  }

  async findOne(username: string): Promise<Admin | undefined> {
    return this.admins.find(admin => admin.username === username);
  }
}
