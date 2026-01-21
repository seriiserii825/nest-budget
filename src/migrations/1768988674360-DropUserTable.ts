import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropUserTable1768988674360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Можно оставить пустым или воссоздать таблицу
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_user_email" UNIQUE ("email"),
        CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
      )
    `);
  }
}
