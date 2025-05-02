import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedAtimages1746013584219 implements MigrationInterface {
    name = 'UpdatedAtimages1746013584219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "updatedAt"`);
    }

}
