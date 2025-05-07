import { injectable } from "tsyringe";
import AppDataSource from "../../../../database";
import Files from "../../../../database/entities/file.entities";

const fileRepo =  AppDataSource.getRepository(Files)
@injectable()
class FileParserDatasource {

    async saveFile(file: any){
        const create = fileRepo.create({file}) 
        return await fileRepo.save(create)
    }
    

}

export default FileParserDatasource