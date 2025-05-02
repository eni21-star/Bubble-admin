"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshTokenRouter = express_1.default.Router();
const tsyringe_1 = require("tsyringe");
const refreshToken_controllers_1 = __importDefault(require("../controllers/refreshToken.controllers"));
const refreshTokenController = tsyringe_1.container.resolve(refreshToken_controllers_1.default);
refreshTokenRouter
    .post('/new-token', refreshTokenController.getAccessToken.bind(refreshTokenController));
exports.default = refreshTokenRouter;
