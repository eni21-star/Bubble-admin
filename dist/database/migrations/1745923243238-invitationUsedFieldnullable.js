"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationUsedFieldnullable1745923243238 = void 0;
class InvitationUsedFieldnullable1745923243238 {
    constructor() {
        this.name = 'InvitationUsedFieldnullable1745923243238';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" ADD "invitationTokenUsed" boolean DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "invitationTokenUsed"`);
    }
}
exports.InvitationUsedFieldnullable1745923243238 = InvitationUsedFieldnullable1745923243238;
