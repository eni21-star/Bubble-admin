"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const careers_controllers_1 = __importDefault(require("./careers.controllers"));
const validation_middleware_1 = require("../../../../shared/middleware/validation.middleware");
const careers_dto_1 = require("./careers.dto");
const careerRoute = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const file_validator_utils_1 = require("../../../../shared/utils/file-validator.utils");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
const careerController = tsyringe_1.container.resolve(careers_controllers_1.default);
careerRoute
    .post(`/careers/apply`, [upload.single('file'), (0, validation_middleware_1.reqValidator)(careers_dto_1.CareersDto), (0, file_validator_utils_1.fileValidator)(['.pdf', '.docx'])], careerController.newApplicant.bind(careerController));
exports.default = careerRoute;
