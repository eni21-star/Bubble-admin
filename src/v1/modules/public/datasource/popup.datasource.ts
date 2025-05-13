import { injectable } from "tsyringe";
import AppDataSource from "../../../../database";
import Popup from "../../../../database/entities/popup.entities";
import { CreatePopupDto, UpdatePopupDto } from "../dto/popup.dto";

const popupRepo = AppDataSource.getRepository(Popup)

@injectable()
class PopupDatasource {

    async createPopup(data: CreatePopupDto){
        const create = popupRepo.create(data)
        return await popupRepo.save(create)
    }

    async findPopupByEmail(email: string){
        return await popupRepo.findOne({ where: { email}})
    }

    async findPopupById(id: string){
        return await popupRepo.findOne({ where: {id}})
    }

    async updatePopup(data: Popup){
        return await popupRepo.save(data)
    }

    async getAllPopups(page: number, limit: number){

        const [data, total] = await popupRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
              createdAt: 'DESC', 
            },
          });
        return { data, total, page, lastPage: Math.ceil(total / limit) }
        }

    async deletePopup(id: string){
        return await popupRepo.delete(id)
    }
}

export default PopupDatasource