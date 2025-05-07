import { injectable } from "tsyringe";
import Images from "../../../../database/entities/images.entities";
import AppDataSource from "../../../../database";
import { plainToInstance } from 'class-transformer';

const imageRepo =  AppDataSource.getRepository(Images)

@injectable()
class ImageDatasource {

    async newImage(image: Images){
        return await imageRepo.save(image)
       
    }

    async findImage(imageId: string, imageSection: string){
        return await imageRepo.findOne({ where: { id: imageId, imageSection}})
    }

    async findImageById(id: string){
        return await imageRepo.findOne({ where: { id }})
    }

    async getImagesBySection(imageSection: string){
        return await imageRepo.find({ where: {imageSection}})
    }

    async deleteImage(id: string){
        return await imageRepo.delete({id})
    }
}

export default ImageDatasource