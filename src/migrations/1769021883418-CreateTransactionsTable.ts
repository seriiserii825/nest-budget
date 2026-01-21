import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionsTable1769021883418 implements MigrationInterface {
  name = 'CreateTransactionsTable1769021883418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "transactions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
