"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// src/lib/logger.ts
const winston_1 = require("winston");
const isDev = process.env.NODE_ENV !== 'production';
exports.logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
    // Pretty in dev, compact JSON in prod
    format: isDev
        ? winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message, ...meta }) => `${timestamp} [${level}] ${message}${Object.keys(meta).length ? ' ' + JSON.stringify(meta) : ''}`))
        : winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console(),
        // Optional: ONE persistent file (no rotation, grows indefinitely)
        // new transports.File({ filename: 'logs/app.log' })
    ],
});
