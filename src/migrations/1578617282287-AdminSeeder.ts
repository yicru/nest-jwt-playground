import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Admin } from '../admins/admin.entity';

export class AdminSeeder1578617282287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = await getRepository(Admin);
    const user = repository.create({
      username: 'admin',
      password: 'secret',
    });
    await repository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await getRepository(Admin).delete({ username: 'admin' });
  }
}
