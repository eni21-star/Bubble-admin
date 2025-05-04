import { NextFunction, Request, Response } from "express"
import { SubscribeDto } from "./subscribe.dto"
import { inject, injectable } from "tsyringe"
import SubscribeService from "./suscribe.services"
import { SuccessResponse } from "../../../../shared/utils/response.utils"


@injectable()
class SubscribeController { 

    constructor(@inject(SubscribeService) private subscribeService: SubscribeService){}
    async subscribe(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const data = req.body as SubscribeDto
            const response = await this.subscribeService.subscribe(data)
            return res.status(201).json(SuccessResponse('Subscribed successfully', response))
            
        } catch (error) {
            next(error)
        }
    }
}

export default SubscribeController