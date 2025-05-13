import { NextFunction, Request, Response } from "express";
import { ReqAdmin } from "../../../../shared/types/req.types";
import PopupStatusDto from "../dto/popup-status.dto";
import { inject, injectable } from "tsyringe";
import PopupStatusServices from "../services/popup-status.services";
import { SuccessResponse } from "../../../../shared/utils/response.utils";

@injectable()
class PopupStatusController {
  constructor(
    @inject(PopupStatusServices)
    private popupStatusServices: PopupStatusServices
  ) {}
  async changeStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const admin = (req as any).admin as ReqAdmin;
      const data = req.body as PopupStatusDto;

      const response = await this.popupStatusServices.changeStatus(data, admin);
      return res.status(200).json(SuccessResponse("Popup updated", response));
    } catch (error) {
      next(error);
    }
  }

  async getStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const response = await this.popupStatusServices.getStatus();
      return res
        .status(200)
        .json(SuccessResponse("Popup details fetched successfully", response));
    } catch (error) {
      next(error);
    }
  }
}

export default PopupStatusController;
