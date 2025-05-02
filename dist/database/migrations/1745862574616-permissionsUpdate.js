"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsUpdate1745862574616 = void 0;
class PermissionsUpdate1745862574616 {
    constructor() {
        this.name = 'PermissionsUpdate1745862574616';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "tokenUsed" boolean NOT NULL DEFAULT false, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "adminId" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageUrl" text NOT NULL, "imageFormat" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "blogId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "permissions" jsonb, "invitationToken" character varying, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "invitedById" uuid, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_2f8e4cf13f140da7f4f08b2bcb6" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_b73513a1d14c8f2908be932becc" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_287cd519dc9dae2f1bb0f7c095a" FOREIGN KEY ("createdById") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_2e6c5c411131c3669bce8fb57fe" FOREIGN KEY ("invitedById") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_2e6c5c411131c3669bce8fb57fe"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_287cd519dc9dae2f1bb0f7c095a"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_b73513a1d14c8f2908be932becc"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_2f8e4cf13f140da7f4f08b2bcb6"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }
}
exports.PermissionsUpdate1745862574616 = PermissionsUpdate1745862574616;
