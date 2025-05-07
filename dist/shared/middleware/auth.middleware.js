"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const errors_1 = require("../errors/errors");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const app_config_1 = __importDefault(require("../../config/app.config"));
const authMiddleware = (req, res, next) => {
    try {
        const token = (req?.headers?.authorization?.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null);
        if (!token)
            throw new errors_1.UnauthorizedError('Access denied. No token provided.');
        const decode = jsonwebtoken_1.default.verify(token, app_config_1.default.services.jwtSecret);
        const currentTime = new Date();
        const timeSeconds = Math.floor(currentTime.getTime() / 1000);
        if (decode.exp < timeSeconds) {
            throw new errors_1.UnauthorizedError('Session expired. Please login again.');
        }
        req.admin = decode;
        next();
    }
    catch (error) {
        if (jsonwebtoken_1.TokenExpiredError)
            throw new errors_1.UnauthorizedError('Token Expired, please login again.');
        throw error;
    }
};
exports.authMiddleware = authMiddleware;
