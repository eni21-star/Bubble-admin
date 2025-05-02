import { MigrationInterface, QueryRunner } from "typeorm";

export class Popups1746170973115 implements MigrationInterface {
    name = 'Popups1746170973115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "popup" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "contactNumber" integer NOT NULL, "stateOfResidence" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cdae257395a57b3508d324d63e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "popup"`);
    }

}
