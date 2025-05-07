"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = __importDefault(require("../../config/app.config"));
const signAccessToken = (data) => {
    return jsonwebtoken_1.default.sign(data, app_config_1.default.services.jwtSecret, { expiresIn: '24hr' });
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (data) => {
    return jsonwebtoken_1.default.sign(data, app_config_1.default.services.jwtSecret, { expiresIn: '7d' });
};
exports.signRefreshToken = signRefreshToken;
