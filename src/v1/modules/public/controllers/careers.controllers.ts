import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { SuccessResponse } from "../../../../shared/utils/response.utils";
import { BadreqError } from "../../../../shared/errors/errors";
import { CareersDto } from "../dto/careers.dto";
import CareerServices from "../services/careers.services";


@injectable()
class CareerController { 

    constructor(@inject(CareerServices) private careerServices: CareerServices){}
    async newApplicant(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {
            
            const data = req.body as CareersDto
            const file = req.file as Express.Multer.File

            const response = await this.careerServices.newApplicant(data, file)
            return res.status(201).json(SuccessResponse('Application sent.', response))

        } catch (error) {
            next(error)
        }
    }
}

export default CareerController