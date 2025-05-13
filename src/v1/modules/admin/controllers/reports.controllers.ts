import { NextFunction, Request, Response } from "express"
import { ReportsDto } from "../dto/reports.dto"
import { ReqAdmin } from "../../../../shared/types/req.types"
import { inject, injectable } from "tsyringe"
import ReportsServices from "../services/reports.services"
import { SuccessResponse } from "../../../../shared/utils/response.utils"

@injectable()
class ReportsController { 

    constructor(@inject(ReportsServices) private reportsServices: ReportsServices){}
    async newReport(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const data = req.body as ReportsDto
            const admin = (req as any).admin as ReqAdmin
            const file = req.files as Express.Multer.File[]

           const response = await this.reportsServices.newReport(data, file, admin)
           return res.status(200).json(SuccessResponse('Report created.', response))
            
        } catch (error) {
            next(error)
        }
    }

    async deleteReport(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const admin = (req as any).admin as ReqAdmin
            const id = req.params.id as string

            const response = await this.reportsServices.deleteReport(id, admin)
            return res.status(200).json(SuccessResponse('Report deleted.', response))
            
        } catch (error) {
            next(error)
        }
    }
}

export default ReportsController