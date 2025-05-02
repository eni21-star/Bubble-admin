import express from 'express'
import { container } from 'tsyringe'
import ImageController from './images.controllers'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import permissionsMiddleware from '../../../../shared/middleware/permissions.middleware'
import { upload } from '../blog/blog.routes'
import { UploadImageDto } from './images.dto'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import { validateIdParams } from '../../../../shared/middleware/validate-id-params.middleware'
const imageRouter = express.Router()

const imageController = container.resolve(ImageController)

imageRouter
.post('/new-image', [ authMiddleware, upload.array('images'), permissionsMiddleware('upload_image'), reqValidator(UploadImageDto)], imageController.newImage.bind(imageController))
.put('/update-image/:id', [authMiddleware, upload.array('images'), permissionsMiddleware('update_image'), validateIdParams ,reqValidator(UploadImageDto)], imageController.updateImage.bind(imageController))
.get('/get-images', imageController.getImageBySection.bind(imageController))
.delete('/delete-image/:id', [authMiddleware, validateIdParams, permissionsMiddleware('delete_image')], imageController.deleteImages.bind(imageController))
export default imageRouter