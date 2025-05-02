import { inject, injectable } from "tsyringe";
import { CreatePopupDto, UpdatePopupDto } from "./popup.dto";
import { ReqAdmin } from "../../../../shared/types/req.types";
import AuthDatasource from "../auth/auth.datasource";
import { ConflictError, NotFoundError } from "../../../../shared/errors/errors";
import PopupDatasource from "./popup.datasource";




@injectable()
class PopupServices {

    constructor(
        @inject(AuthDatasource) private authDatasource: AuthDatasource,
        @inject(PopupDatasource) private popupDatasource: PopupDatasource
    ){}
    async createPopup(data: CreatePopupDto, admin: ReqAdmin){
        try {
            
            const { id } = admin
            const { email } = data
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('user does not exist. Please create an account')

            const popupExist = await this.popupDatasource.findPopupByEmail(email)
            if(popupExist) throw new ConflictError('Popup already exist.')
            
            return await this.popupDatasource.createPopup(data)

            return data
        } catch (error) {
            throw error
        }
    }

    async updatePopup(popupId: string, data: UpdatePopupDto, admin: ReqAdmin){
        try {
            
            
            const { id } = admin
            const { fullName, email, stateOfResidence, phoneNumber } = data
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('user does not exist. Please create an account')

            let popupExist = await this.popupDatasource.findPopupById(popupId)
            if(!popupExist) throw new NotFoundError('Popup does not exist.')
            
            popupExist.email = email ? email : popupExist.email
            popupExist.fullName = fullName ? fullName : popupExist.fullName
            popupExist.phoneNumber = phoneNumber ? phoneNumber : popupExist.phoneNumber
            popupExist.stateOfResidence = stateOfResidence ? stateOfResidence : popupExist.stateOfResidence

            return await this.popupDatasource.updatePopup(popupExist)

        } catch (error) {
            throw error
        }
    }

    async getAllPopups(page: number, limit: number){
        try {
            
            return await this.popupDatasource.getAllPopups(page, limit)

        } catch (error) {
            throw error 
        }
    }

    async getPopupById(id: string){
        try {
            
            let popupExist = await this.popupDatasource.findPopupById(id)
            if(!popupExist) throw new NotFoundError('Popup does not exist.')
            return popupExist
            
        } catch (error) {
            throw error
        }
    }

    async deletePopup(id: string, admin: ReqAdmin){
        try {

            const userExist = await this.authDatasource.findById(admin.id)
            if(!userExist) throw new NotFoundError('user does not exist. Please create an account')

            let popupExist = await this.popupDatasource.findPopupById(id)
            if(!popupExist) throw new NotFoundError('Popup does not exist.')

            return await this.popupDatasource.deletePopup(id)
            
        } catch (error) {
            
        }
    }
}

export default PopupServices