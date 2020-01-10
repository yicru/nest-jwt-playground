import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Admin } from '../admins/admin.entity';
import * as bcrypt from 'bcrypt';

export class AdminSeeder1578617282287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = await getRepository(Admin);
    const user = repository.create({
      username: 'admin',
      password: bcrypt.hashSync('secret', 10),
    });
    await repository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await getRepository(Admin).delete({ username: 'admin' });
  }
}
