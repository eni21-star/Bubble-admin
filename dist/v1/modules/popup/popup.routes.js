"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const popup_controllers_1 = __importDefault(require("./controllers/popup.controllers"));
const auth_middleware_1 = require("../../../shared/middleware/auth.middleware");
const permissions_middleware_1 = __importDefault(require("../../../shared/middleware/permissions.middleware"));
const validation_middleware_1 = require("../../../shared/middleware/validation.middleware");
const popup_dto_1 = require("./dto/popup.dto");
const validate_id_params_middleware_1 = require("../../../shared/middleware/validate-id-params.middleware");
const popupRouter = express_1.default.Router();
const popupController = tsyringe_1.container.resolve(popup_controllers_1.default);
popupRouter
    .post('/popup/create', [auth_middleware_1.authMiddleware, (0, permissions_middleware_1.default)('create_popup'), (0, validation_middleware_1.reqValidator)(popup_dto_1.CreatePopupDto)], popupController.createPopup.bind(popupController))
    .put('/popup/update/:id', [auth_middleware_1.authMiddleware, (0, permissions_middleware_1.default)('update_popup'), (0, validation_middleware_1.reqValidator)(popup_dto_1.UpdatePopupDto)], popupController.updatePopup.bind(popupController))
    .get('/popups', popupController.getAllPopups.bind(popupController))
    .get('/popup/:id', validate_id_params_middleware_1.validateIdParams, popupController.getPopupById.bind(popupController))
    .delete('/popup/delete/:id', [auth_middleware_1.authMiddleware, (0, permissions_middleware_1.default)('delete_popup'), validate_id_params_middleware_1.validateIdParams], popupController.deletePopup.bind(popupController));
exports.default = popupRouter;
