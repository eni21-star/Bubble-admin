import { ObjectLiteral } from "typeorm";


export const SuccessResponse = (message: string, data?: ObjectLiteral, meta?: ObjectLiteral)=>{

    return {
        status: true,
        message,
        data,
        meta
    }
}