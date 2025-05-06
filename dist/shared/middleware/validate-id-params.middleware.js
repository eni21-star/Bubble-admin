"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParams = void 0;
const validator_1 = require("validator");
const validateIdParams = (req, res, next) => {
    const { id } = req.params;
    if (!(0, validator_1.isUUID)(id)) {
        return res.status(400).json({ message: 'Invalid ID parameter.' });
    }
    next();
};
exports.validateIdParams = validateIdParams;
