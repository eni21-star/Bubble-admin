"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const invite_controllers_1 = __importDefault(require("./invite.controllers"));
const auth_middleware_1 = require("../../../../shared/middleware/auth.middleware");
const validation_middleware_1 = require("../../../../shared/middleware/validation.middleware");
const invite_dto_1 = require("../dto/invite.dto");
const permissions_middleware_1 = __importDefault(require("../../../../shared/middleware/permissions.middleware"));
const inviteRouter = express_1.default.Router();
const inviteController = tsyringe_1.container.resolve(invite_controllers_1.default);
inviteRouter
    .post('/send-invite', [auth_middleware_1.authMiddleware, (0, permissions_middleware_1.default)('send_invite'), (0, validation_middleware_1.reqValidator)(invite_dto_1.InviteDto)], inviteController.sendInvite.bind(inviteController))
    .post('/accept-invite/:id', [(0, validation_middleware_1.reqValidator)(invite_dto_1.AcceptInviteDto)], inviteController.acceptInvite.bind(inviteController));
exports.default = inviteRouter;
