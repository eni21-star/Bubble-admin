"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const health_controller_1 = __importDefault(require("./health.controller"));
const healthRouter = express_1.default.Router();
const tsyringe_1 = require("tsyringe");
const healthController = tsyringe_1.container.resolve(health_controller_1.default);
healthRouter.get('/', healthController.chechHealth.bind(healthController));
exports.default = healthRouter;
