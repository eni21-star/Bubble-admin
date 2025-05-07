import { NextFunction, Request, Response } from "express"
import { IncidentDto } from "../dto/incidents.dto"
import { inject, injectable } from "tsyringe"
import IncidentService from "../services/incidents.services"
import { SuccessResponse } from "../../../../shared/utils/response.utils"
import { BadreqError } from "../../../../shared/errors/errors"

@injectable()
class IncidentsController { 

    constructor(@inject(IncidentService) private incidentService: IncidentService){}
    async submitIncident(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const file = req.files as Express.Multer.File[]
            if(file.length === 0) throw new BadreqError('No file in request.')
            const data = req.body as IncidentDto

            const response = await this.incidentService.submitIncident(data, file)
            return res.status(201).json(SuccessResponse('incident submitted.', response))
            
        } catch (error) {
           next(error)
        }
    }
}

export default IncidentsController