import express from 'express'
import { container } from 'tsyringe'
import PopupController from '../controllers/popup.controllers'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import permissionsMiddleware from '../../../../shared/middleware/permissions.middleware'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { CreatePopupDto, UpdatePopupDto } from '../dto/popup.dto'
import { validateIdParams } from '../../../../shared/middleware/validate-id-params.middleware'
const popupRouter = express.Router()

const popupController = container.resolve(PopupController)

popupRouter
.post('/popup/create', reqValidator(CreatePopupDto), popupController.createPopup.bind(popupController))
.put('/popup/update/:id', [authMiddleware, permissionsMiddleware('update_popup'), reqValidator(UpdatePopupDto)], popupController.updatePopup.bind(popupController))
.get('/popups', popupController.getAllPopups.bind(popupController))
.get('/popup/:id', validateIdParams, popupController.getPopupById.bind(popupController))
.delete('/popup/delete/:id', [authMiddleware, permissionsMiddleware('delete_popup'), validateIdParams], popupController.deletePopup.bind(popupController))

export default popupRouter