"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInvitations21745838198508 = void 0;
class AddInvitations21745838198508 {
    constructor() {
        this.name = 'AddInvitations21745838198508';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" ADD "InvitedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD "inviitationToken" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "inviitationToken"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP COLUMN "InvitedBy"`);
    }
}
exports.AddInvitations21745838198508 = AddInvitations21745838198508;
