import { inject, injectable } from "tsyringe";
import uploadImage from "../../../../shared/cloudinary/upload.cloudinary";
import Images from "../../../../database/entities/images.entities";
import { UploadImageDto } from "./images.dto";
import ImageDatasource from "./images.datasource";
import { ReqAdmin } from "../../../../shared/types/req.types";
import AuthDatasource from "../auth/auth.datasource";
import { NotFoundError } from "../../../../shared/errors/errors";


@injectable()
class ImageService {
    constructor(
        @inject(ImageDatasource) private imageDatasource:ImageDatasource,
        @inject(AuthDatasource) private authDatasource: AuthDatasource
    ){

    }
    async newImage(file: Express.Multer.File[], data: UploadImageDto, admin: ReqAdmin): Promise<Array<object>>{

        try {

            
            const { id } = admin
            const { imageSection } = data
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('Please create an account to proceed')

            const image = await uploadImage(file)
           
            const response: Array<Images> = []
            for(let i =0; i< image.length; i++){
                const newImage = new Images()
                newImage.imageFormat = image[i].imageFormat
                newImage.imageUrl = image[i].imageUrl
                newImage.imageSection = imageSection
                newImage.uploadedBy = userExist
                response.push(await this.imageDatasource.newImage(newImage))
            }

            
            const filteredData =  response.map(image => ({
                id: image.id,
                imageUrl: image.imageUrl,
                imageFormat: image.imageFormat,
                imageSection: image.imageSection
            }))

            return filteredData

        } catch (error) {
            throw error
        }
    }

    async updateImage(data: { imageId: string, imageSection: string}, file: Express.Multer.File[], admin: ReqAdmin){
        try {
            
            const { id } = admin
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('Please create an account to proceed.')
            
            let findImage = await this.imageDatasource.findImage(data.imageId, data.imageSection) 
            if(!findImage) throw new NotFoundError('Image not found.')
            
            const image = await uploadImage(file)

            findImage.imageFormat = image[0].imageFormat
            findImage.imageUrl = image[0].imageUrl
            findImage.uploadedBy = userExist

            const saveUpdatedImage = await this.imageDatasource.newImage(findImage)

            const { uploadedBy, ...rest } = saveUpdatedImage
            return rest
            
        } catch (error) {
            throw error
        }
    }


    async getImageBySection(imageSection: string){


        try {
            const fetch = await this.imageDatasource.getImagesBySection(imageSection)
            return fetch.map( image => ({ 
                id: image.id,
                imageUrl: image.imageUrl,
                imageFormat: image.imageFormat,
                imageSection: image.imageSection
            }))
        } catch (error) {
            throw error
        }
    }

    async deleteImage(imageId: string, admin: ReqAdmin){
        try {

            const { id } = admin
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('Please create an account to proceed')
            
            const findimage = await this.imageDatasource.findImageById(imageId)
            if(!findimage) throw new NotFoundError('Image not found.')

            return await this.imageDatasource.deleteImage(imageId)

        } catch (error) {
            throw error
        }
    }
}

export default ImageService