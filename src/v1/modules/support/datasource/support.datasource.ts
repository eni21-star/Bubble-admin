import { injectable } from "tsyringe"
import AppDataSource from "../../../../database"
import Admin from "../../../../database/entities/admin.entities"

const authRepo = AppDataSource.getRepository(Admin)
@injectable()
class SupportDatasource {

    async findAvailableagent(){
        const findSupport = await authRepo.findOne({ where: { role: 'SUPPORT', isAvailable: true}})
        if(!findSupport) { 
            return await authRepo.findOne({ where: {role: 'ADMIN'}})
        }
        return findSupport
    }
}


export default SupportDatasource