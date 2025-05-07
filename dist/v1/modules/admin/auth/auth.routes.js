"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const tsyringe_1 = require("tsyringe");
const auth_controllers_1 = __importDefault(require("./auth.controllers"));
const validation_middleware_1 = require("../../../../shared/middleware/validation.middleware");
const auth_dto_1 = require("./auth.dto");
const authController = tsyringe_1.container.resolve(auth_controllers_1.default);
authRouter
    .post('/register', (0, validation_middleware_1.reqValidator)(auth_dto_1.RegisterDto), authController.register.bind(authController))
    .post('/login', (0, validation_middleware_1.reqValidator)(auth_dto_1.LoginDto), authController.login.bind(authController));
exports.default = authRouter;
