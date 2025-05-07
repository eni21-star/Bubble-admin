"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const SuccessResponse = (message, data, meta) => {
    return {
        status: true,
        message,
        data,
        meta
    };
};
exports.SuccessResponse = SuccessResponse;
