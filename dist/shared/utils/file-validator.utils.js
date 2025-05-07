"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidator = void 0;
const path_1 = __importDefault(require("path"));
const errors_1 = require("../errors/errors");
const fileValidator = (acceptedExt) => {
    return async (req, res, next) => {
        try {
            const file = req.file;
            if (!file)
                throw new errors_1.BadreqError('No file in request.');
            const fileExtension = path_1.default.extname(file.originalname);
            if (!acceptedExt.includes(fileExtension))
                throw new errors_1.BadreqError('File type is invalid.');
            next();
        }
        catch (error) {
            throw error;
        }
    };
};
exports.fileValidator = fileValidator;
