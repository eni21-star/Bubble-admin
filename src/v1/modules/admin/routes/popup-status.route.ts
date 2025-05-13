import express from "express";
import { container } from "tsyringe";
import PopupStatusController from "../controllers/popup-status.controllers";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
import permissionsMiddleware from "../../../../shared/middleware/permissions.middleware";
import { reqValidator } from "../../../../shared/middleware/validation.middleware";
import PopupStatusDto from "../dto/popup-status.dto";
const popupStatusRouter = express.Router();

const popupStatusController = container.resolve(PopupStatusController);

popupStatusRouter
  .put(
    "/popup/status",
    [
      authMiddleware,
      permissionsMiddleware("update_popup"),
      reqValidator(PopupStatusDto),
    ],
    popupStatusController.changeStatus.bind(popupStatusController)
  )
  .get("/popup", popupStatusController.getStatus.bind(popupStatusController));

export default popupStatusRouter;
