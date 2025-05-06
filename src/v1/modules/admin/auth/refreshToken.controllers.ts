import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../../shared/errors/errors";
import { inject, injectable } from "tsyringe";
import RefreshTokenService from "./refreshToken.services";
import appConfig from "../../../../config/app.config";


@injectable()
class RefreshTokenController {

    constructor(@inject(RefreshTokenService) private refreshTokenService: RefreshTokenService){}

    async getAccessToken(req: Request, res: Response, next: NextFunction):Promise<any>{
        try {

            const refreshToken = req.cookies['refreshToken']
          //  console.log(req.cookies)
            if(!refreshToken) throw new UnauthorizedError('Refresh token not provided')
            
            const response = await this.refreshTokenService.getAccessToken(refreshToken)
            return res.status(200).cookie('refreshToken', response.newRefreshToken , {
                httpOnly: true,
                secure: appConfig.app.env === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,}).json({accessToken: response.accessToken})

        } catch (error) {
            throw error
        }
    }
}

export default RefreshTokenController