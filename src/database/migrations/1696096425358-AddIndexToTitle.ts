import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexToTitle1696096425358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE FULLTEXT INDEX IDX_TITLE ON issues (title)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IDX_TITLE ON issues');
  }
}
