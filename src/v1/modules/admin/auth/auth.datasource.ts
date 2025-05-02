
import { injectable } from "tsyringe"
import AppDataSource from "./../../../../database"
import Admin from "../../../../database/entities/admin.entities"
import RefreshToken from "../../../../database/entities/refresh-token.entities"
import { RegisterDto } from "./auth.dto"

const adminRepo = AppDataSource.getRepository(Admin)

@injectable()
class AuthDatasource {

    async findByEmail(email: string){
       return await adminRepo.createQueryBuilder('admin')
       .addSelect('admin.password')
       .where('admin.email = :email', { email})
       .getOne();
    }

    async newAdmin(data: RegisterDto){

        const admin = adminRepo.create(data)
        const save =  await adminRepo.save(admin)
        const { password, ...rest } = save
        return rest

    }

    async newInvitedAdmin(data: Admin){

        const save =  await adminRepo.save(data)
        const { password, ...rest } = save
        return rest
        
    }

    async findById(id: string){
        return await adminRepo.findOne({ where: { id }})
    }

   async updateUser(admin: Admin){
         
        const { password, ...rest } = await adminRepo.save(admin)
        return rest
   }

   async findInviteByToken(token: string){
    return await adminRepo.findOne({ where: { invitationToken: token} })
   }
}


export default AuthDatasource