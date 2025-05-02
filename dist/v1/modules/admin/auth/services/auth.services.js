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
const auth_datasource_1 = __importDefault(require("../datasource/auth.datasource"));
const errors_1 = require("../../../../../shared/errors/errors");
const hash_utils_1 = require("../../../../../shared/utils/hash.utils");
const jwt_utils_1 = require("../../../../../shared/utils/jwt.utils");
const refreshToken_datasource_1 = __importDefault(require("../datasource/refreshToken.datasource"));
let AuthService = class AuthService {
    constructor(authDatasource, refreshTokenDatasource) {
        this.authDatasource = authDatasource;
        this.refreshTokenDatasource = refreshTokenDatasource;
    }
    async register(data) {
        try {
            let { email, username, password } = data;
            const userExist = await this.authDatasource.findByEmail(email);
            if (userExist)
                throw new errors_1.ConflictError('Admin with that email already exists. Try loggin in.');
            data.password = await (0, hash_utils_1.bcryptHash)(password);
            data.email = email.toLowerCase();
            const create = await this.authDatasource.newAdmin(data);
            return create;
        }
        catch (error) {
            throw error;
        }
    }
    async login(data) {
        try {
            const { email, password } = data;
            const userExist = await this.authDatasource.findByEmail(email);
            if (!userExist)
                throw new errors_1.NotFoundError('user does not exist. Please create an account');
            const compare = await (0, hash_utils_1.bcryptCompare)(password, userExist.password);
            if (!compare)
                throw new errors_1.UnauthorizedError('Incorrect password');
            const accessToken = (0, jwt_utils_1.signAccessToken)({ id: userExist.id });
            const refreshToken = (0, jwt_utils_1.signRefreshToken)({ id: userExist.id });
            const saveRefresh = await this.refreshTokenDatasource.saveRefreshToken(userExist, refreshToken);
            return { accessToken, refreshToken };
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_datasource_1.default)),
    __param(1, (0, tsyringe_1.inject)(refreshToken_datasource_1.default)),
    __metadata("design:paramtypes", [auth_datasource_1.default,
        refreshToken_datasource_1.default])
], AuthService);
exports.default = AuthService;
