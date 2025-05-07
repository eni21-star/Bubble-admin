"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const logger_1 = require("./shared/utils/logger/logger");
const bootstrap = async () => {
    try {
        await database_1.default.initialize();
        logger_1.logger.info('Database running successfully..');
    }
    catch (error) {
        logger_1.logger.error(error.message);
    }
};
exports.default = bootstrap;
