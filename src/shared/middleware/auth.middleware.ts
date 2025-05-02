import { NextFunction, Request, Response } from "express"
import { BadreqError, UnauthorizedError } from "../errors/errors"
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import appConfig from "../../config/app.config"
import { ReqAdmin } from "../types/req.types"

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{

   try {
    
    const token:string | null = (req?.headers?.authorization?.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null)
    if(!token) throw new UnauthorizedError('Access denied. No token provided.')

    const decode = jwt.verify(token, appConfig.services.jwtSecret) as ReqAdmin
    const currentTime = new Date()
    const timeSeconds = Math.floor(currentTime.getTime() / 1000)
    
    if(decode.exp < timeSeconds) { throw new UnauthorizedError('Session expired. Please login again.')}
    (req as any).admin = decode
    next()

   } catch (error) {
    if(TokenExpiredError) throw new UnauthorizedError('Token Expired, please login again.')
    throw error
   }
}