import { inject, injectable } from "tsyringe";
import Admin from "../../../../database/entities/admin.entities";
import AppDataSource from "../../../../database";

const adminRepo = AppDataSource.getRepository(Admin)

@injectable()
class ConnectedProfileDatasource {
    async getConnectedProfiles(admin: Admin){
        return await adminRepo.find({ where: { invitedBy: { id: admin.id } } })
    }

}

export default ConnectedProfileDatasource