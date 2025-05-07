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
const upload_cloudinary_1 = __importDefault(require("../../../../shared/cloudinary/upload.cloudinary"));
const images_entities_1 = __importDefault(require("../../../../database/entities/images.entities"));
const images_datasource_1 = __importDefault(require("../datasource/images.datasource"));
const auth_datasource_1 = __importDefault(require("../auth/auth.datasource"));
const errors_1 = require("../../../../shared/errors/errors");
let ImageService = class ImageService {
    constructor(imageDatasource, authDatasource) {
        this.imageDatasource = imageDatasource;
        this.authDatasource = authDatasource;
    }
    async newImage(file, data, admin) {
        try {
            const { id } = admin;
            const { imageSection } = data;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed');
            const image = await (0, upload_cloudinary_1.default)(file);
            const response = [];
            for (let i = 0; i < image.length; i++) {
                const newImage = new images_entities_1.default();
                newImage.imageFormat = image[i].imageFormat;
                newImage.imageUrl = image[i].imageUrl;
                newImage.imageSection = imageSection;
                newImage.uploadedBy = userExist;
                response.push(await this.imageDatasource.newImage(newImage));
            }
            const filteredData = response.map(image => ({
                id: image.id,
                imageUrl: image.imageUrl,
                imageFormat: image.imageFormat,
                imageSection: image.imageSection
            }));
            return filteredData;
        }
        catch (error) {
            throw error;
        }
    }
    async updateImage(data, file, admin) {
        try {
            const { id } = admin;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed.');
            let findImage = await this.imageDatasource.findImage(data.imageId, data.imageSection);
            if (!findImage)
                throw new errors_1.NotFoundError('Image not found.');
            const image = await (0, upload_cloudinary_1.default)(file);
            findImage.imageFormat = image[0].imageFormat;
            findImage.imageUrl = image[0].imageUrl;
            findImage.uploadedBy = userExist;
            const saveUpdatedImage = await this.imageDatasource.newImage(findImage);
            const { uploadedBy, ...rest } = saveUpdatedImage;
            return rest;
        }
        catch (error) {
            throw error;
        }
    }
    async getImageBySection(imageSection) {
        try {
            const fetch = await this.imageDatasource.getImagesBySection(imageSection);
            return fetch.map(image => ({
                id: image.id,
                imageUrl: image.imageUrl,
                imageFormat: image.imageFormat,
                imageSection: image.imageSection
            }));
        }
        catch (error) {
            throw error;
        }
    }
    async deleteImage(imageId, admin) {
        try {
            const { id } = admin;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed');
            const findimage = await this.imageDatasource.findImageById(imageId);
            if (!findimage)
                throw new errors_1.NotFoundError('Image not found.');
            return await this.imageDatasource.deleteImage(imageId);
        }
        catch (error) {
            throw error;
        }
    }
};
ImageService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(images_datasource_1.default)),
    __param(1, (0, tsyringe_1.inject)(auth_datasource_1.default)),
    __metadata("design:paramtypes", [images_datasource_1.default, typeof (_a = typeof auth_datasource_1.default !== "undefined" && auth_datasource_1.default) === "function" ? _a : Object])
], ImageService);
exports.default = ImageService;
