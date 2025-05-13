import { NextFunction, Request, Response } from "express"
import { ReqAdmin } from "../../../../shared/types/req.types"
import { inject, injectable } from "tsyringe"
import ProfileServices from "../services/profile.services"
import { SuccessResponse } from "../../../../shared/utils/response.utils"

@injectable()
class ProfileController { 

    constructor(@inject(ProfileServices) private profileServices: ProfileServices){}
    async getProfile(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const admin = (req as any).admin as ReqAdmin

            const response = await this.profileServices.getProfile(admin)
            return res.status(200).json(SuccessResponse('Profile retrieved', response))
            
        } catch (error) {
            next(error)
        }
    }
}

export default ProfileController