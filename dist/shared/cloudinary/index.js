"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const app_config_1 = __importDefault(require("../../config/app.config"));
cloudinary_1.v2.config({
    cloud_name: app_config_1.default.services.cloudinary_cloud_name, // your cloud name
    api_key: app_config_1.default.services.cloudinary_api_key, // your API key
    api_secret: app_config_1.default.services.cloudinary_api_secret, // your API secret
});
exports.default = cloudinary_1.v2;
