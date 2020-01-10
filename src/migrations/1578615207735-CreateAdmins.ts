import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdmins1578615207735 implements MigrationInterface {
  name = 'CreateAdmins1578615207735';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `admin` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `admin`', undefined);
  }
}
