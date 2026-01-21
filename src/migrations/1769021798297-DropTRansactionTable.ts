import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropTRansactionTable1769021798297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "transactions"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a0e79799d372feefcdbf2ff8e2" PRIMARY KEY ("id"))`,
    );
  }
}
