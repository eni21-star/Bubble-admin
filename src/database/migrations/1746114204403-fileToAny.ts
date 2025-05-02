import { MigrationInterface, QueryRunner } from "typeorm";

export class FileToAny1746114204403 implements MigrationInterface {
    name = 'FileToAny1746114204403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
