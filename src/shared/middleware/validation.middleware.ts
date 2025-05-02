import { NextFunction, Request, Response } from "express"
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator';
import { BadreqError } from "../errors/errors";

export const reqValidator = (dtoClass: any)=>{

   return async(req: Request, res: Response, next: NextFunction)=>{

        if(typeof req.body == 'undefined') throw new BadreqError('Empty Request')
        const dto = plainToInstance(dtoClass, req.body)
        const errors = await validate(dto);
        if (errors.length > 0) {
          res.status(400).json({ success: false, errors });
          return;
        }
    
        next();
   }
}