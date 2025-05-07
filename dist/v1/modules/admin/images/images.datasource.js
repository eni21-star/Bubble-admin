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
const images_entities_1 = __importDefault(require("../../../../database/entities/images.entities"));
const database_1 = __importDefault(require("../../../../database"));
const imageRepo = database_1.default.getRepository(images_entities_1.default);
let ImageDatasource = class ImageDatasource {
    async newImage(image) {
        return await imageRepo.save(image);
    }
    async findImage(imageId, imageSection) {
        return await imageRepo.findOne({ where: { id: imageId, imageSection } });
    }
    async findImageById(id) {
        return await imageRepo.findOne({ where: { id } });
    }
    async getImagesBySection(imageSection) {
        return await imageRepo.find({ where: { imageSection } });
    }
    async deleteImage(id) {
        return await imageRepo.delete({ id });
    }
};
ImageDatasource = __decorate([
    (0, tsyringe_1.injectable)()
], ImageDatasource);
exports.default = ImageDatasource;
