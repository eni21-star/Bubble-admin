import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../../../../shared/errors/errors";
import { ReqAdmin } from "../../../../shared/types/req.types";
import AuthDatasource from "../datasource/auth.datasource";
import PopupStatusDto from "../dto/popup-status.dto";
import PopupStatusDatasource from "../datasource/popup-status.datasource";
import Popup from "../../../../database/entities/popup.entities";
import PopupStatus from "../../../../database/entities/popup-status.entities";

@injectable()
class PopupStatusServices {
  constructor(
    @inject(AuthDatasource) private authDatasource: AuthDatasource,
    @inject(PopupStatusDatasource)
    private popupStatusDatasource: PopupStatusDatasource
  ) {}
  async changeStatus(data: PopupStatusDto, admin: ReqAdmin) {
    try {
      const { status } = data;

      const { id } = admin;
      const userExist = await this.authDatasource.findById(id);
      if (!userExist) throw new NotFoundError("User does not exist.");

      const popupExist = await this.popupStatusDatasource.popupStatusExist()
      
      if(popupExist.length > 0){
        return await this.popupStatusDatasource.changeStatus(status);
      }

      const newPopup = new PopupStatus
      newPopup.isEnabled = status
      return await this.popupStatusDatasource.savePopupStatus(newPopup)
      
    } catch (error) {
      throw error;
    }
  }

  async getStatus() {
    try {
      const popup = await this.popupStatusDatasource.fetchStatusDetail();

      if (!popup) throw new NotFoundError("Error fetching popup status.");

      return popup;
    } catch (error) {
      throw error;
    }
  }
}

export default PopupStatusServices;
