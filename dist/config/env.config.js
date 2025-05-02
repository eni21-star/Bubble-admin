"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const env = process.env.NODE_ENV || 'development';
const getEnv = () => {
    return env;
};
exports.getEnv = getEnv;
