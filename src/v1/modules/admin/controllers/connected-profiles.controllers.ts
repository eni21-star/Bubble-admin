import { NextFunction, Request, Response } from "express"
import { ReqAdmin } from "../../../../shared/types/req.types"
import { inject, injectable } from "tsyringe"
import ConnectedProfileServices from "../services/connected-profiles.services"

@injectable()
class ConnectedProfileController { 

    constructor(@inject(ConnectedProfileServices) private connectedProfileServices: ConnectedProfileServices ){}
    async getConnectedProfiles(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const admin = (req as any).admin as ReqAdmin
            const response = await this.connectedProfileServices.getConnectedProfiles(admin)
            
        } catch (error) {
            next(error)
        }
    }
}

export default ConnectedProfileController