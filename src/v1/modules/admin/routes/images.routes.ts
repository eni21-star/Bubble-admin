import express from 'express'
import { container } from 'tsyringe'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import permissionsMiddleware from '../../../../shared/middleware/permissions.middleware'
import { upload } from './blog.routes'
import { UploadImageDto } from '../dto/images.dto'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import { validateIdParams } from '../../../../shared/middleware/validate-id-params.middleware'
import { fileValidator } from '../../../../shared/middleware/file-validator.utils'
import ImageController from '../controllers/images.controllers'
const imageRouter = express.Router()

const imageController = container.resolve(ImageController)

imageRouter
.post('/new-image', [ authMiddleware, upload.array('images'), fileValidator(['.png', '.jpg', '.jpeg']), permissionsMiddleware('upload_image'), reqValidator(UploadImageDto)], imageController.newImage.bind(imageController))
.put('/update-image/:id', [authMiddleware, upload.array('images'), fileValidator(['.png', '.jpg', '.jpeg']), permissionsMiddleware('update_image'), validateIdParams ,reqValidator(UploadImageDto)], imageController.updateImage.bind(imageController))
.get('/get-images', imageController.getImageBySection.bind(imageController))
.delete('/delete-image/:id', [authMiddleware, validateIdParams, permissionsMiddleware('delete_image')], imageController.deleteImages.bind(imageController))
export default imageRouter