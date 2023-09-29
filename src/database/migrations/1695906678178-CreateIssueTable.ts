import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIssueTable1695906678178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE issues (
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        state VARCHAR(255) NOT NULL DEFAULT 'open'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE issues;`);
  }
}
