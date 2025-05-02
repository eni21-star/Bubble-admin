"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationUsedFieldnullable1745923854415 = void 0;
class InvitationUsedFieldnullable1745923854415 {
    constructor() {
        this.name = 'InvitationUsedFieldnullable1745923854415';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" ADD "invitationTokenUsed" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "invitationTokenUsed"`);
    }
}
exports.InvitationUsedFieldnullable1745923854415 = InvitationUsedFieldnullable1745923854415;
