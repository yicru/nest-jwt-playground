import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdmins1578617152757 implements MigrationInterface {
  name = 'CreateAdmins1578617152757';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `admin` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, INDEX `IDX_5e568e001f9d1b91f67815c580` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'DROP INDEX `IDX_5e568e001f9d1b91f67815c580` ON `admin`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `admin`', undefined);
  }
}
