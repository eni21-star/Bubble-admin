"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors/errors");
const image_validator_utils_1 = __importDefault(require("../utils/image-validator.utils"));
const index_1 = __importDefault(require("./index")); // adjust path if different
async function uploadImage(file) {
    try {
        const imageData = [];
        for (let i = 0; i < file.length; i++) {
            const validateImage = await (0, image_validator_utils_1.default)(file[i]);
            if (!validateImage.valid)
                throw new errors_1.BadreqError(validateImage.reason);
            const result = await index_1.default.uploader.upload(file[i].path, { folder: 'fsl-admin', });
            const { secure_url, format, original_filename } = result;
            imageData.push({ imageUrl: secure_url, imageFormat: format, original_filename });
        }
        return imageData;
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}
exports.default = uploadImage;
