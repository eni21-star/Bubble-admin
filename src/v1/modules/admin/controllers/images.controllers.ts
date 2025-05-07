import { NextFunction, Request, Response } from "express";
import { BadreqError } from "../../../../shared/errors/errors";
import { inject, injectable } from "tsyringe";
import { SuccessResponse } from "../../../../shared/utils/response.utils";
import { UploadImageDto } from "../dto/images.dto";
import { ReqAdmin } from "../../../../shared/types/req.types";
import ImageService from "../services/images.services";

@injectable()
class ImageController {

    constructor(@inject(ImageService) private imageService: ImageService){}
    async newImage(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {
            
            const file = req.files as Express.Multer.File[]
            const data = req.body as UploadImageDto
            const admin = (req as any).admin as ReqAdmin
            
            if(file?.length === 0) throw new BadreqError('No image in request.')
            
            const response = await this.imageService.newImage(file, data, admin)
            return res.status(201).json(SuccessResponse('Image uploaded.', response))

        } catch (error) {
            next(error)
        }
    }

    async updateImage(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const file = req.files as Express.Multer.File[]
            const { imageSection } = req.body as UploadImageDto
            const imageId  = req.params.id

            const admin  = (req as any).admin as ReqAdmin
            if(file?.length === 0) throw new BadreqError('No image in request.')
            
            const response = await this.imageService.updateImage({imageId, imageSection}, file, admin)
            return res.status(200).json(SuccessResponse('Image Updated.', response))
        } catch (error) {
             next(error)
        }
    }

    async getImageBySection(req: Request, res: Response, next: NextFunction): Promise<any>{
       
        try {

            const  {imageSection}  = req.query as any
            if(!imageSection || typeof imageSection == 'undefined') throw new BadreqError('invalid query.')

            const response = await this.imageService.getImageBySection(imageSection)
            return res.status(200).json(SuccessResponse('Succesfully retrieved images.', response))


        } catch (error) {
            next(error)
        }
    }

    async deleteImages(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {
            
            const id = req.params.id
            const admin = (req as any).admin 

            const response = await this.imageService.deleteImage(id, admin)
            return res.status(200).json(SuccessResponse('Image deleted.', response))
        } catch (error) {
            next(error)
        }
    }
}

export default ImageController