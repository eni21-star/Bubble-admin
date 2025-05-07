
import AppDataSource from "../../../../database"
import Admin from "../../../../database/entities/admin.entities"
import RefreshToken from "../../../../database/entities/refresh-token.entities"
const refTokenRepo = AppDataSource.getRepository(RefreshToken)

class RefreshTokenDatasource {

    async findToken(token: string){
        return await refTokenRepo.findOne({ where: { token}, relations: ['admin']})
    }

    async saveRefreshToken(admin: Admin, token: string){
        const newToken = new RefreshToken()
        newToken.token = token
        newToken.admin = admin
        newToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        await refTokenRepo.save(newToken)

    }

    async invalidateToken(token: RefreshToken){
       await refTokenRepo.save(token)
    }
}

export default RefreshTokenDatasource