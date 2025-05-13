import { NextFunction, Request, Response } from "express"
import { ReportsDto } from "../dto/reports.dto"
import { ReqAdmin } from "../../../../shared/types/req.types"
import { inject, injectable } from "tsyringe"
import ReportsServices from "../services/reports.services"
import { SuccessResponse } from "../../../../shared/utils/response.utils"
import { BadreqError } from "../../../../shared/errors/errors"

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

    async getReports(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const typeArray = ['RESOURCES', 'REPORTS']
            const {type, page, limit} = req.query as any

            if(!type || !typeArray.includes(type)) throw new BadreqError('Report or resource Type not in request or invalid values.')
            
            const pageValue = page && !isNaN(Number(page)) ? Number(page) : 1;
            const limitValue = limit && !isNaN(Number(limit)) ? Number(limit) : 10;

            const response = await this.reportsServices.getReports(type, pageValue, limitValue)
            return res.status(200).json(SuccessResponse('Reports/resource retieved', response))
            
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