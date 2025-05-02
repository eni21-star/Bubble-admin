"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.BadreqError = exports.CustomError = void 0;
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
    const error = err;
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
};
exports.errorHandler = errorHandler;
