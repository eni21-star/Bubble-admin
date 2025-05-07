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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const auth_datasource_1 = __importDefault(require("../admin/auth/auth.datasource"));
const errors_1 = require("../../../shared/errors/errors");
const popup_datasource_1 = __importDefault(require("./datasource/popup.datasource"));
let PopupServices = class PopupServices {
    constructor(authDatasource, popupDatasource) {
        this.authDatasource = authDatasource;
        this.popupDatasource = popupDatasource;
    }
    async createPopup(data, admin) {
        try {
            const { id } = admin;
            const { email } = data;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('user does not exist. Please create an account');
            const popupExist = await this.popupDatasource.findPopupByEmail(email);
            if (popupExist)
                throw new errors_1.ConflictError('Popup already exist.');
            return await this.popupDatasource.createPopup(data);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async updatePopup(popupId, data, admin) {
        try {
            const { id } = admin;
            const { fullName, email, stateOfResidence, phoneNumber } = data;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('user does not exist. Please create an account');
            let popupExist = await this.popupDatasource.findPopupById(popupId);
            if (!popupExist)
                throw new errors_1.NotFoundError('Popup does not exist.');
            popupExist.email = email ? email : popupExist.email;
            popupExist.fullName = fullName ? fullName : popupExist.fullName;
            popupExist.phoneNumber = phoneNumber ? phoneNumber : popupExist.phoneNumber;
            popupExist.stateOfResidence = stateOfResidence ? stateOfResidence : popupExist.stateOfResidence;
            return await this.popupDatasource.updatePopup(popupExist);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllPopups(page, limit) {
        try {
            return await this.popupDatasource.getAllPopups(page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    async getPopupById(id) {
        try {
            let popupExist = await this.popupDatasource.findPopupById(id);
            if (!popupExist)
                throw new errors_1.NotFoundError('Popup does not exist.');
            return popupExist;
        }
        catch (error) {
            throw error;
        }
    }
    async deletePopup(id, admin) {
        try {
            const userExist = await this.authDatasource.findById(admin.id);
            if (!userExist)
                throw new errors_1.NotFoundError('user does not exist. Please create an account');
            let popupExist = await this.popupDatasource.findPopupById(id);
            if (!popupExist)
                throw new errors_1.NotFoundError('Popup does not exist.');
            return await this.popupDatasource.deletePopup(id);
        }
        catch (error) {
        }
    }
};
PopupServices = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_datasource_1.default)),
    __param(1, (0, tsyringe_1.inject)(popup_datasource_1.default)),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_datasource_1.default !== "undefined" && auth_datasource_1.default) === "function" ? _a : Object, popup_datasource_1.default])
], PopupServices);
exports.default = PopupServices;
