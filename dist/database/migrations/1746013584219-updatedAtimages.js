"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedAtimages1746013584219 = void 0;
class UpdatedAtimages1746013584219 {
    constructor() {
        this.name = 'UpdatedAtimages1746013584219';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "images" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "updatedAt"`);
    }
}
exports.UpdatedAtimages1746013584219 = UpdatedAtimages1746013584219;
