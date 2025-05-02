"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInvitations41745839747864 = void 0;
class AddInvitations41745839747864 {
    constructor() {
        this.name = 'AddInvitations41745839747864';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" ADD "inviitationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD "invitedById" uuid`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_c1ae0cd255afc7b000e3b742748" FOREIGN KEY ("invitedById") REFERENCES "Admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_c1ae0cd255afc7b000e3b742748"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "invitedById"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "inviitationToken"`);
    }
}
exports.AddInvitations41745839747864 = AddInvitations41745839747864;
