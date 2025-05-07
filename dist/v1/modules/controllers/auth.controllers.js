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
const auth_services_1 = __importDefault(require("../services/auth.services"));
const response_utils_1 = require("../../../shared/utils/response.utils");
const app_config_1 = __importDefault(require("../../../config/app.config"));
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res, next) {
        try {
            const data = req.body;
            const response = await this.authService.register(data);
            return res.status(201).json((0, response_utils_1.SuccessResponse)('Admin created', response));
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const data = req.body;
            const response = await this.authService.login(data);
            return res.status(200).cookie('refreshToken', response.refreshToken, {
                httpOnly: true,
                secure: app_config_1.default.app.env === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
                .json((0, response_utils_1.SuccessResponse)('Login Successful', { accessToken: response.accessToken }));
        }
        catch (error) {
            next(error);
        }
    }
};
AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_services_1.default)),
    __metadata("design:paramtypes", [auth_services_1.default])
], AuthController);
exports.default = AuthController;
