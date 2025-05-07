"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.BadreqError = exports.CustomError = void 0;
const multer_1 = __importDefault(require("multer"));
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}
exports.CustomError = CustomError;
class BadreqError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadreqError = BadreqError;
class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        const error = err;
        res.status(error.statusCode).json({ message: error.message });
        return;
    }
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({ error: "File too large. Max size is 5MB." });
        }
        return res.status(400).json({ error: `Multer error: ${err.message}` });
    }
    const error = err;
    if (error.status === 400) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
};
exports.errorHandler = errorHandler;
