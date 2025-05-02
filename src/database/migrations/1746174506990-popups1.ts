import { MigrationInterface, QueryRunner } from "typeorm";

export class Popups11746174506990 implements MigrationInterface {
    name = 'Popups11746174506990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "popup" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "popup" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "popup" DROP CONSTRAINT "PK_cdae257395a57b3508d324d63e3"`);
        await queryRunner.query(`ALTER TABLE "popup" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "popup" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "popup" ADD CONSTRAINT "PK_cdae257395a57b3508d324d63e3" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "popup" DROP CONSTRAINT "PK_cdae257395a57b3508d324d63e3"`);
        await queryRunner.query(`ALTER TABLE "popup" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "popup" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "popup" ADD CONSTRAINT "PK_cdae257395a57b3508d324d63e3" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "popup" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "popup" ADD "contactNumber" integer NOT NULL`);
    }

}
