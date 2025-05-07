"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const database_1 = __importDefault(require("../../../database"));
const popup_entities_1 = __importDefault(require("../../../database/entities/popup.entities"));
const popupRepo = database_1.default.getRepository(popup_entities_1.default);
let PopupDatasource = class PopupDatasource {
    async createPopup(data) {
        const create = popupRepo.create(data);
        return await popupRepo.save(create);
    }
    async findPopupByEmail(email) {
        return await popupRepo.findOne({ where: { email } });
    }
    async findPopupById(id) {
        return await popupRepo.findOne({ where: { id } });
    }
    async updatePopup(data) {
        return await popupRepo.save(data);
    }
    async getAllPopups(page, limit) {
        const [data, total] = await popupRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
        });
        return { data, total, page, lastPage: Math.ceil(total / limit) };
    }
    async deletePopup(id) {
        return await popupRepo.delete(id);
    }
};
PopupDatasource = __decorate([
    (0, tsyringe_1.injectable)()
], PopupDatasource);
exports.default = PopupDatasource;
