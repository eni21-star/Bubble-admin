"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationUsedField1745921606421 = void 0;
class InvitationUsedField1745921606421 {
    constructor() {
        this.name = 'InvitationUsedField1745921606421';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" ADD "invitationTokenUsed" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "invitationTokenUsed"`);
    }
}
exports.InvitationUsedField1745921606421 = InvitationUsedField1745921606421;
