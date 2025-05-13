import { injectable } from "tsyringe";
import AppDataSource from "../../../../database";
import PopupStatus from "../../../../database/entities/popup-status.entities";

const popupStatusRepo = AppDataSource.getRepository(PopupStatus);

@injectable()
class PopupStatusDatasource {
  async changeStatus(status: boolean) {
    return await popupStatusRepo.update({}, { isEnabled: status });
  }

  async fetchStatusDetail(): Promise<PopupStatus | null> {
    return await popupStatusRepo.findOne({ where: {} });
  }
}

export default PopupStatusDatasource;
