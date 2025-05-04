import { inject, injectable } from "tsyringe";
import FileParserService from "./file-parser.services";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../../../../shared/utils/response.utils";
import { ReqAdmin } from "../../../../shared/types/req.types";


@injectable()
class FileParserController {

    constructor(@inject(FileParserService) private fileParserService: FileParserService){}

    async parseFile(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const file = req.file as Express.Multer.File
            const admin = (req as any).admin as ReqAdmin
            
           
            const response = await this.fileParserService.parseFile(file, admin)
            return res.status(201).json(SuccessResponse('File converted', response))
            
        } catch (error) {
            next(error)
        }

    }

}

export default FileParserController