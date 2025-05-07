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
const invite_service_1 = __importDefault(require("../services/invite.service"));
const response_utils_1 = require("../../../../shared/utils/response.utils");
let InviteController = class InviteController {
    constructor(inviteService) {
        this.inviteService = inviteService;
    }
    async sendInvite(req, res, next) {
        try {
            const data = req.body;
            const admin = req.admin;
            const response = await this.inviteService.sendInvite(admin, data);
            return res.status(201).json((0, response_utils_1.SuccessResponse)('Invite sent successfully', response));
        }
        catch (error) {
            next(error);
        }
    }
    async acceptInvite(req, res, next) {
        try {
            const token = req.params.id;
            const data = req.body;
            const response = await this.inviteService.acceptInvite(token, data);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Invite accepted.', response));
        }
        catch (error) {
            next(error);
        }
    }
};
InviteController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(invite_service_1.default)),
    __metadata("design:paramtypes", [invite_service_1.default])
], InviteController);
exports.default = InviteController;
// 
