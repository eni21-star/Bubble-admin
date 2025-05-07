"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const validation_middleware_1 = require("../../../../shared/middleware/validation.middleware");
const permissions_middleware_1 = __importDefault(require("../../../../shared/middleware/permissions.middleware"));
const blog_routes_1 = require("./blog.routes");
const images_dto_1 = require("../dto/images.dto");
const auth_middleware_1 = require("../../../../shared/middleware/auth.middleware");
const validate_id_params_middleware_1 = require("../../../../shared/middleware/validate-id-params.middleware");
const images_controllers_1 = __importDefault(require("../controllers/images.controllers"));
const imageRouter = express_1.default.Router();
const imageController = tsyringe_1.container.resolve(images_controllers_1.default);
imageRouter
    .post('/new-image', [auth_middleware_1.authMiddleware, blog_routes_1.upload.array('images'), (0, permissions_middleware_1.default)('upload_image'), (0, validation_middleware_1.reqValidator)(images_dto_1.UploadImageDto)], imageController.newImage.bind(imageController))
    .put('/update-image/:id', [auth_middleware_1.authMiddleware, blog_routes_1.upload.array('images'), (0, permissions_middleware_1.default)('update_image'), validate_id_params_middleware_1.validateIdParams, (0, validation_middleware_1.reqValidator)(images_dto_1.UploadImageDto)], imageController.updateImage.bind(imageController))
    .get('/get-images', imageController.getImageBySection.bind(imageController))
    .delete('/delete-image/:id', [auth_middleware_1.authMiddleware, validate_id_params_middleware_1.validateIdParams, (0, permissions_middleware_1.default)('delete_image')], imageController.deleteImages.bind(imageController));
exports.default = imageRouter;
