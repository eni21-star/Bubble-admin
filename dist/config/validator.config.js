"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeCustomValidators = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
// Define custom validators here
const initializeCustomValidators = () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    validatorjs_1.default.register('name', (value) => {
        return /^[a-zA-Z-]{2,100}$/.test(value);
    }, 'The :attribute field is not valid');
    validatorjs_1.default.register('username', (value) => {
        return /^[a-zA-Z-][a-zA-Z0-9_-]{1,20}$/.test(value);
    }, 'The :attribute field is not valid');
    validatorjs_1.default.register('uuid', (value) => {
        return uuidRegex.test(value);
    }, ':attribute is not a valid UUID');
    validatorjs_1.default.register('isIn', (value, requirement) => {
        return (requirement.split(',').findIndex((element) => {
            return element.toLowerCase() === value.toLowerCase();
        }) !== -1);
    }, 'The :attribute must be one of the allowed values');
};
exports.initializeCustomValidators = initializeCustomValidators;
exports.default = validatorjs_1.default;
