"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database"));
const refresh_token_entities_1 = __importDefault(require("../../../database/entities/refresh-token.entities"));
const refTokenRepo = database_1.default.getRepository(refresh_token_entities_1.default);
class RefreshTokenDatasource {
    async findToken(token) {
        return await refTokenRepo.findOne({ where: { token }, relations: ['admin'] });
    }
    async saveRefreshToken(admin, token) {
        const newToken = new refresh_token_entities_1.default();
        newToken.token = token;
        newToken.admin = admin;
        newToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await refTokenRepo.save(newToken);
    }
    async invalidateToken(token) {
        await refTokenRepo.save(token);
    }
}
exports.default = RefreshTokenDatasource;
