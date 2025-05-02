"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIXINvitationtokenfield1745841003865 = void 0;
class FIXINvitationtokenfield1745841003865 {
    constructor() {
        this.name = 'FIXINvitationtokenfield1745841003865';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" ADD "invitationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD "invitedById" uuid`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_c1ae0cd255afc7b000e3b742748" FOREIGN KEY ("invitedById") REFERENCES "Admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_c1ae0cd255afc7b000e3b742748"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "invitedById"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "invitationToken"`);
    }
}
exports.FIXINvitationtokenfield1745841003865 = FIXINvitationtokenfield1745841003865;
