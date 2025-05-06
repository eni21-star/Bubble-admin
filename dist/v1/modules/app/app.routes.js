"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appRouter = express_1.default.Router();
const app_controller_1 = __importDefault(require("./app.controller"));
const tsyringe_1 = require("tsyringe");
const appController = tsyringe_1.container.resolve(app_controller_1.default);
appRouter.get('/', appController.appController.bind(appController));
exports.default = appRouter;
