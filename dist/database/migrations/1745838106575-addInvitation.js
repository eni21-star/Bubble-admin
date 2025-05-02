"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInvitation1745838106575 = void 0;
class AddInvitation1745838106575 {
    constructor() {
        this.name = 'AddInvitation1745838106575';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" ADD "InvitedBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD "inviitationToken" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "inviitationToken"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "InvitedBy"`);
    }
}
exports.AddInvitation1745838106575 = AddInvitation1745838106575;
