"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const auth_datasource_1 = __importDefault(require("./auth.datasource"));
const errors_1 = require("../../../../shared/errors/errors");
const refreshToken_datasource_1 = __importDefault(require("./refreshToken.datasource"));
const jwt_utils_1 = require("../../../../shared/utils/jwt.utils");
let RefreshTokenService = class RefreshTokenService {
    constructor(authDatasource, refreshTokenDatasource) {
        this.authDatasource = authDatasource;
        this.refreshTokenDatasource = refreshTokenDatasource;
    }
    async getAccessToken(refreshToken) {
        try {
            const findToken = await this.refreshTokenDatasource.findToken(refreshToken);
            if (!findToken || findToken.tokenUsed)
                throw new errors_1.NotFoundError('Token may have been used. Please login');
            const userExist = await this.authDatasource.findById(findToken.admin.id);
            if (!userExist)
                throw new errors_1.NotFoundError('User does not exist. Please create an account.');
            const accessToken = (0, jwt_utils_1.signAccessToken)({ id: userExist.id, permissions: userExist.permissions });
            const newRefreshToken = (0, jwt_utils_1.signRefreshToken)({ id: userExist.id });
            const saveRefresh = await this.refreshTokenDatasource.saveRefreshToken(userExist, newRefreshToken);
            findToken.tokenUsed = true;
            await this.refreshTokenDatasource.invalidateToken(findToken);
            return { accessToken, newRefreshToken };
        }
        catch (error) {
            throw error;
        }
    }
};
RefreshTokenService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_datasource_1.default)),
    __param(1, (0, tsyringe_1.inject)(refreshToken_datasource_1.default)),
    __metadata("design:paramtypes", [auth_datasource_1.default,
        refreshToken_datasource_1.default])
], RefreshTokenService);
exports.default = RefreshTokenService;
