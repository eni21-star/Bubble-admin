"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../../../shared/middleware/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const tsyringe_1 = require("tsyringe");
const file_validator_utils_1 = require("../../../../shared/utils/file-validator.utils");
const file_parser_controller_1 = __importDefault(require("../controllers/file-parser.controller"));
const fileParserController = tsyringe_1.container.resolve(file_parser_controller_1.default);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
const fileParserRouter = express_1.default.Router();
fileParserRouter
    .post('/parse-file', [auth_middleware_1.authMiddleware, upload.single('file'), (0, file_validator_utils_1.fileValidator)(['.csv', '.xlsx', '.xls'])], fileParserController.parseFile.bind(fileParserController));
exports.default = fileParserRouter;
