import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import multer from "multer";

export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; 
    }
}

export class BadreqError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, 409);
    }
}

export const errorHandler: any = (err: unknown, req: Request, res: Response, next: NextFunction)=>{

    if(err instanceof CustomError ){
        const error = err as CustomError
        res.status(error.statusCode).json({ message: error.message})
        return
    }

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({ error: "File too large. Max size is 5MB." });
        }
        return res.status(400).json({ error: `Multer error: ${err.message}` });
      }

    const error = err as any

    if(error.status === 400){
        
        console.log(error)
        res.status(400).json({ message: error.message})

    }
    console.log(error)
    res.status(500).json({ message: 'internal server error'})
}
