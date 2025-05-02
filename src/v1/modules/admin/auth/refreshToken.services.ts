import { inject, injectable } from "tsyringe";
import AuthDatasource from "./auth.datasource";
import { NotFoundError } from "../../../../shared/errors/errors";
import RefreshTokenDatasource from "./refreshToken.datasource";
import { signAccessToken, signRefreshToken } from "../../../../shared/utils/jwt.utils";


@injectable()
class RefreshTokenService {

    constructor(
        @inject(AuthDatasource) private authDatasource:AuthDatasource,
        @inject(RefreshTokenDatasource) private refreshTokenDatasource: RefreshTokenDatasource ){}

    async getAccessToken(refreshToken: string): Promise<{accessToken: string, newRefreshToken: string}>{
        try {
            
            const findToken = await this.refreshTokenDatasource.findToken(refreshToken)
            if(!findToken || findToken.tokenUsed) throw new NotFoundError('Token may have been used. Please login')
            
                
            const userExist = await this.authDatasource.findById(findToken.admin.id)
            if(!userExist) throw new NotFoundError('User does not exist. Please create an account.')

            const accessToken = signAccessToken({id: userExist.id, permissions: userExist.permissions as string[] }) 

            const newRefreshToken = signRefreshToken({id: userExist.id})
            const saveRefresh = await this.refreshTokenDatasource.saveRefreshToken(userExist, newRefreshToken)
           
            findToken.tokenUsed = true
            await this.refreshTokenDatasource.invalidateToken(findToken)
            return {accessToken, newRefreshToken}
            

        } catch (error) {
            throw error 
        }
    }
}

export default RefreshTokenService