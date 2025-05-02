
import path from "path";
import { BadreqError } from "../errors/errors";
import { NextFunction, Request, Response } from "express";

export const fileValidator = (acceptedExt: Array<string>) => {
    
  
   return async (req: Request, res: Response, next: NextFunction) => {

    try {

        const file = req.file as Express.Multer.File
        if(!file) throw new BadreqError('No file in request.')
    
        const fileExtension = path.extname(file.originalname)
        console.log(fileExtension)
        if(!acceptedExt.includes(fileExtension))  throw new BadreqError('File type is invalid.')
        
        next()
        
    } catch (error) {
        throw error
    }

   }

}