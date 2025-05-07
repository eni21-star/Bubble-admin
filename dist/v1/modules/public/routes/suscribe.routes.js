"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const validation_middleware_1 = require("../../../../shared/middleware/validation.middleware");
const subscribe_dto_1 = require("../dto/subscribe.dto");
const suscribe_controllers_1 = __importDefault(require("../controllers/suscribe.controllers"));
const subscribebRoute = express_1.default.Router();
const subscribeController = tsyringe_1.container.resolve(suscribe_controllers_1.default);
subscribebRoute
    .post('/subscribe', (0, validation_middleware_1.reqValidator)(subscribe_dto_1.SubscribeDto), subscribeController.subscribe.bind(subscribeController));
exports.default = subscribebRoute;
