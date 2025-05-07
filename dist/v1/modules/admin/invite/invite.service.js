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
const auth_datasource_1 = __importDefault(require("../auth/auth.datasource"));
const errors_1 = require("../../../../shared/errors/errors");
const crypto_utils_1 = require("../../../../shared/utils/crypto.utils");
const admin_entities_1 = __importDefault(require("../../../../database/entities/admin.entities"));
const hash_utils_1 = require("../../../../shared/utils/hash.utils");
let InviteService = class InviteService {
    constructor(authDatasource) {
        this.authDatasource = authDatasource;
    }
    async sendInvite(admin, data) {
        try {
            // console.log(admin)
            const { id } = admin;
            const { email } = data;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.UnauthorizedError('Please create an account to proceed.');
            if (userExist.role != 'SUPERADMIN')
                throw new errors_1.UnauthorizedError('Permission Denied.');
            let invitationSent = await this.authDatasource.findByEmail(email);
            if (invitationSent?.invitationTokenUsed) {
                throw new errors_1.ForbiddenError('You have already taken this action.');
            }
            if (invitationSent) { // resend invitation
                const token = (0, crypto_utils_1.generateCryptoToken)();
                invitationSent.invitationToken = token;
                const updateTokenInDb = this.authDatasource.updateUser(invitationSent);
                // emailLogic emailToken(email, token)
                return { message: 'Invitation Resent', token };
            }
            const token = (0, crypto_utils_1.generateCryptoToken)();
            const newAdmin = new admin_entities_1.default();
            newAdmin.email = email;
            newAdmin.password = 'admin';
            newAdmin.invitedBy = userExist;
            newAdmin.invitationToken = token;
            newAdmin.username = 'admin';
            newAdmin.role = 'ADMIN';
            await this.authDatasource.newInvitedAdmin(newAdmin);
            // send email logic 
            return { message: 'Invitation sent', token };
        }
        catch (error) {
            throw error;
        }
    }
    async acceptInvite(token, data) {
        try {
            const { username, password } = data;
            const findInvite = await this.authDatasource.findInviteByToken(token);
            if (!findInvite)
                throw new errors_1.NotFoundError('Invitation does not exist.');
            if (findInvite?.invitationTokenUsed) {
                throw new errors_1.ForbiddenError('You have already taken this action.');
            }
            const hashedPassword = await (0, hash_utils_1.bcryptHash)(password);
            findInvite.username = username;
            findInvite.password = hashedPassword;
            findInvite.invitationTokenUsed = true;
            const updateUser = await this.authDatasource.updateUser(findInvite);
            return updateUser;
        }
        catch (error) {
            throw error;
        }
    }
};
InviteService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_datasource_1.default)),
    __metadata("design:paramtypes", [auth_datasource_1.default])
], InviteService);
exports.default = InviteService;
