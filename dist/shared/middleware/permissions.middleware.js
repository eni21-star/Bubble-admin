"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors/errors");
const permissionsMiddleware = (permission) => {
    return async (req, res, next) => {
        try {
            const admin = req.admin;
            const { permissions } = admin;
            if (!permissions.includes(permission)) {
                throw new errors_1.ForbiddenError('You do not have permission to this function.');
            }
            next();
        }
        catch (error) {
            throw error;
        }
    };
};
exports.default = permissionsMiddleware;
