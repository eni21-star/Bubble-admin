import { NextFunction, Request, Response } from "express";


class HealthController {

    chechHealth(req: Request, res: Response, next: NextFunction) {
        try {

             res.status(200).json({
                status: 'Running',
                timestamp: new Date()
            })

        } catch (error) {
            next(error)
        }
    }
}
export default HealthController