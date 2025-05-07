import { MigrationInterface, QueryRunner } from "typeorm";

export class IncidentsTableUrl1746618506226 implements MigrationInterface {
    name = 'IncidentsTableUrl1746618506226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "incidents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "insuredName" character varying NOT NULL, "policyNumber" character varying NOT NULL, "description" text NOT NULL, "imageUrl" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ccb34c01719889017e2246469f9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "incidents"`);
    }

}
