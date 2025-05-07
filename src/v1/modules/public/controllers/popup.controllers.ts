import { NextFunction, Request, Response } from "express"
import { ReqAdmin } from "../../../../shared/types/req.types"
import { inject, injectable } from "tsyringe"
import { SuccessResponse } from "../../../../shared/utils/response.utils"
import { BadreqError } from "../../../../shared/errors/errors"
import { CreatePopupDto,UpdatePopupDto} from "../dto/popup.dto"
import PopupServices from "../services/popup.services"

@injectable()
class PopupController { 
    constructor(@inject(PopupServices) private popupService: PopupServices){}
    async createPopup(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const data = req.body as CreatePopupDto

            const response = await this.popupService.createPopup(data)
            return res.status(201).json(SuccessResponse('Popup created', response))
            
        } catch (error) {
            next(error)        
        }
    }

    async updatePopup(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
            const data = req.body as UpdatePopupDto
            const admin = (req as any).admin
            const popupId = req.params.id

            const response = await this.popupService.updatePopup(popupId, data, admin)
            return res.status(200).json(SuccessResponse('Popup updated.', response))

        } catch (error) {
            next(error)
        }
    }

    async getAllPopups(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
            const { page, limit } = req.query

            if(!page || !limit) throw new BadreqError('Page and limit values not provided.')
                
            const pageToNumber = Number(page)
            const limitToNumber = Number(limit)

            const response = await this.popupService.getAllPopups(pageToNumber, limitToNumber)
            return res.status(200).json(SuccessResponse('Popups retrieved.', response))

        } catch (error) {
            next(error)
        }
    }

    async getPopupById(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
            const popupId = req.params.id

            const response = await this.popupService.getPopupById(popupId)
            return res.status(200).json(SuccessResponse('Popup retrieved.', response))

        } catch (error) {
            next(error)
        }
    }

    async deletePopup(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
            const admin = (req as any).admin
            const popupId = req.params.id

            const response = await this.popupService.deletePopup(popupId, admin)
            return res.status(200).json(SuccessResponse('Popup deleted.', response))

        } catch (error) {
            next(error)
        }
    }
}

export default PopupController