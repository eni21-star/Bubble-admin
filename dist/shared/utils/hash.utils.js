"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptCompare = exports.bcryptHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcryptHash = async (password) => {
    return await bcrypt_1.default.hash(password, 10);
};
exports.bcryptHash = bcryptHash;
const bcryptCompare = async (password, hash) => {
    return await bcrypt_1.default.compare(password, hash);
};
exports.bcryptCompare = bcryptCompare;
