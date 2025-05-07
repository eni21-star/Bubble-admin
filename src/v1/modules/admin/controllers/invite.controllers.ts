import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AcceptInviteDto, InviteDto } from "../dto/invite.dto";
import { ReqAdmin } from "../../../../shared/types/req.types";
import InviteService from "../services/invite.service";
import { SuccessResponse } from "../../../../shared/utils/response.utils";


@injectable()
class InviteController { 

    constructor(@inject(InviteService) private inviteService: InviteService){}
    async sendInvite(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const data = req.body as InviteDto
            const admin = (req as any).admin as ReqAdmin

            const response = await this.inviteService.sendInvite(admin, data)
            return res.status(201).json(SuccessResponse('Invite sent successfully', response))

            
        } catch (error) {
            next(error)
        }
    }

    async acceptInvite(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {
            
            const token = req.params.id
            const data = req.body as AcceptInviteDto

            const response = await this.inviteService.acceptInvite(token, data)
            return res.status(200).json(SuccessResponse('Invite accepted.', response))
            
        } catch (error) {
            next(error)
        }
    }
}

export default InviteController

// 