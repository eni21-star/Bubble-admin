import { inject, injectable } from "tsyringe";
import { ReqAdmin } from "../../../../shared/types/req.types";
import AuthDatasource from "../datasource/auth.datasource";
import { ForbiddenError, NotFoundError } from "../../../../shared/errors/errors";
import ConnectedProfileDatasource from "../datasource/connected-profiles.datasource";


@injectable()
class ConnectedProfileServices {
    constructor(
        @inject(AuthDatasource) private authDatasource: AuthDatasource,
        @inject(ConnectedProfileDatasource) private connectedProfileDatasource: ConnectedProfileDatasource
    ){}

   async getConnectedProfiles(admin: ReqAdmin){
        try {
            
            const { id }= admin
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError("user does not exist")
            if(userExist.role != 'SUPERADMIN') throw new ForbiddenError('You do not have permission to this function')

            return await this.connectedProfileDatasource.getConnectedProfiles(userExist)
        } catch (error) {
            throw error
        }
    }

}


export default ConnectedProfileServices