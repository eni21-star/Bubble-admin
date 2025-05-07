"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqValidator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const errors_1 = require("../errors/errors");
const reqValidator = (dtoClass) => {
    return async (req, res, next) => {
        if (typeof req.body == 'undefined')
            throw new errors_1.BadreqError('Empty Request');
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            res.status(400).json({ success: false, errors });
            return;
        }
        next();
    };
};
exports.reqValidator = reqValidator;
