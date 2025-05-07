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
const errors_1 = require("../../../../shared/errors/errors");
const tsyringe_1 = require("tsyringe");
const response_utils_1 = require("../../../../shared/utils/response.utils");
const images_services_1 = __importDefault(require("../services/images.services"));
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async newImage(req, res, next) {
        try {
            const file = req.files;
            const data = req.body;
            const admin = req.admin;
            if (file?.length === 0)
                throw new errors_1.BadreqError('No image in request.');
            const response = await this.imageService.newImage(file, data, admin);
            return res.status(201).json((0, response_utils_1.SuccessResponse)('Image uploaded.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async updateImage(req, res, next) {
        try {
            const file = req.files;
            const { imageSection } = req.body;
            const imageId = req.params.id;
            const admin = req.admin;
            if (file?.length === 0)
                throw new errors_1.BadreqError('No image in request.');
            const response = await this.imageService.updateImage({ imageId, imageSection }, file, admin);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Image Updated.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async getImageBySection(req, res, next) {
        try {
            const { imageSection } = req.query;
            if (!imageSection || typeof imageSection == 'undefined')
                throw new errors_1.BadreqError('invalid query.');
            const response = await this.imageService.getImageBySection(imageSection);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Succesfully retrieved images.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async deleteImages(req, res, next) {
        try {
            const id = req.params.id;
            const admin = req.admin;
            const response = await this.imageService.deleteImage(id, admin);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Image deleted.', response));
        }
        catch (error) {
            next(error);
        }
    }
};
ImageController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(images_services_1.default)),
    __metadata("design:paramtypes", [images_services_1.default])
], ImageController);
exports.default = ImageController;
