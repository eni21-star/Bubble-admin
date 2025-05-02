import { NextFunction, Request, Response } from "express";
import { CareersDto } from "./careers.dto";
import { inject, injectable } from "tsyringe";
import CareerServices from "./careers.services";
import { SuccessResponse } from "../../../../shared/utils/response.utils";
import { BadreqError } from "../../../../shared/errors/errors";


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