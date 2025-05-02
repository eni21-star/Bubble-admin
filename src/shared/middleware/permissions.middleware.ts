import { NextFunction, Request, Response } from "express"
import { ReqAdmin } from "../types/req.types"
import { ForbiddenError } from "../errors/errors"



const permissionsMiddleware = (permission: string)=>{
    return async(req: Request, res: Response, next: NextFunction)=>{

       try {
        
        const admin = (req as any).admin as ReqAdmin
        const { permissions } = admin

        if(!permissions.includes(permission)) { 
            throw new ForbiddenError('You do not have permission to this function.') 
        }
        
        next()

       } catch (error) {
            throw error
       }

    }
}

export default permissionsMiddleware