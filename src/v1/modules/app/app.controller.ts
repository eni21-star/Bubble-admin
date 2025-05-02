import { NextFunction, Request, Response } from "express";
import { RouteVersion } from "../../../config/route.config";

class AppController {
    async appController(req: Request, res: Response, next: NextFunction){
        return res.status(200).json({
            name: 'FSL-API',
            Version: `${RouteVersion.v1}`
        })
    }
}

export default AppController