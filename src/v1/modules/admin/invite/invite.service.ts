import { inject, injectable } from "tsyringe"
import { AcceptInviteDto, InviteDto } from "./invite.dto"
import { ReqAdmin } from "../../../../shared/types/req.types"
import AuthDatasource from "../auth/auth.datasource"
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../../../../shared/errors/errors"
import { generateCryptoToken } from "../../../../shared/utils/crypto.utils"
import Admin from "../../../../database/entities/admin.entities"
import { bcryptHash } from "../../../../shared/utils/hash.utils"


@injectable()
class InviteService { 
    constructor(@inject(AuthDatasource) private authDatasource: AuthDatasource){}
    async sendInvite(admin: ReqAdmin, data: InviteDto): Promise<{ message: string, token: string}>{
        
        try {
            console.log(admin)
            const{ id } = admin
            const { email } = data

            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new UnauthorizedError('Please create an account to proceed.')

            if(userExist.role != 'SUPERADMIN') throw new UnauthorizedError('Permission Denied.')
            
            let invitationSent = await this.authDatasource.findByEmail(email)

            if(invitationSent?.invitationTokenUsed){
                throw new ForbiddenError('You have already taken this action.')
            }
            
            if(invitationSent){ // resend invitation
                const token = generateCryptoToken()
                invitationSent.invitationToken = token
                const updateTokenInDb = this.authDatasource.updateUser(invitationSent)
                // emailLogic emailToken(email, token)
                return { message: 'Invitation Resent', token}
            }
            
            const token = generateCryptoToken()
            const newAdmin = new Admin()
            newAdmin.email = email
            newAdmin.password = 'admin'
            newAdmin.invitedBy = userExist
            newAdmin.invitationToken = token
            newAdmin.username = 'admin'
            newAdmin.role = 'ADMIN'

            const createAdmin = this.authDatasource.newInvitedAdmin(newAdmin)
            // send email logic 
            return { message: 'Invitation sent', token}

            
        } catch (error) {
            throw error
        }
    }

    async acceptInvite(token: string, data: AcceptInviteDto): Promise<any>{
        
        try {
            const { username, password} = data
            const findInvite = await this.authDatasource.findInviteByToken(token)

            if(!findInvite) throw new NotFoundError('Invitation does not exist.')
            
             if(findInvite?.invitationTokenUsed){
                throw new ForbiddenError('You have already taken this action.')
            }

            const hashedPassword = await bcryptHash(password)
            findInvite.username = username
            findInvite.password = hashedPassword
            findInvite.invitationTokenUsed = true

            const updateUser = await this.authDatasource.updateUser(findInvite)
            return updateUser

        } catch (error) {
            throw error
        }
    }
}

export default InviteService