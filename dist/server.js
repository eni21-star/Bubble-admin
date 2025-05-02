"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = __importDefault(require("./bootstrap"));
const logger_1 = require("./shared/utils/logger/logger");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const app_config_1 = __importDefault(require("./config/app.config"));
const server = http_1.default.createServer(app_1.default);
const port = app_config_1.default.server.port;
const startServer = async () => {
    await (0, bootstrap_1.default)();
    server.listen(port, '0.0.0.0', () => {
        logger_1.logger.info(`${app_config_1.default.app.name} is running on port ${port} in environment ${app_config_1.default.app.env} `);
    });
};
process
    .on('uncaughtException', (err) => {
    logger_1.logger.error({ err });
    console.log(err);
    process.exit(1);
})
    .on('SIGINT', () => {
    process.exit(0);
});
startServer();
