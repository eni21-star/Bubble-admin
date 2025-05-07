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
const popup_services_1 = __importDefault(require("./popup.services"));
const response_utils_1 = require("../../../../shared/utils/response.utils");
const errors_1 = require("../../../../shared/errors/errors");
let PopupController = class PopupController {
    constructor(popupService) {
        this.popupService = popupService;
    }
    async createPopup(req, res, next) {
        try {
            const data = req.body;
            const admin = req.admin;
            const response = await this.popupService.createPopup(data, admin);
            return res.status(201).json((0, response_utils_1.SuccessResponse)('Popup created', response));
        }
        catch (error) {
            next(error);
        }
    }
    async updatePopup(req, res, next) {
        try {
            const data = req.body;
            const admin = req.admin;
            const popupId = req.params.id;
            const response = await this.popupService.updatePopup(popupId, data, admin);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Popup updated.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async getAllPopups(req, res, next) {
        try {
            const { page, limit } = req.query;
            if (!page || !limit)
                throw new errors_1.BadreqError('Page and limit values not provided.');
            const pageToNumber = Number(page);
            const limitToNumber = Number(limit);
            const response = await this.popupService.getAllPopups(pageToNumber, limitToNumber);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Popups retrieved.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async getPopupById(req, res, next) {
        try {
            const popupId = req.params.id;
            const response = await this.popupService.getPopupById(popupId);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Popup retrieved.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async deletePopup(req, res, next) {
        try {
            const admin = req.admin;
            const popupId = req.params.id;
            const response = await this.popupService.deletePopup(popupId, admin);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Popup deleted.', response));
        }
        catch (error) {
            next(error);
        }
    }
};
PopupController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(popup_services_1.default)),
    __metadata("design:paramtypes", [popup_services_1.default])
], PopupController);
exports.default = PopupController;
