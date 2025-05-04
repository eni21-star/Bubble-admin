import express from 'express'
import { container } from 'tsyringe'
import CareerController from './careers.controllers'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { CareersDto } from './careers.dto'
const careerRoute = express.Router()
import multer from 'multer';
import { fileValidator } from '../../../../shared/utils/file-validator.utils'

const storage = multer.memoryStorage();
const upload = multer({ storage,  limits: { fileSize: 5 * 1024 * 1024 } });
const careerController = container.resolve(CareerController)


careerRoute
.post(`/careers/apply`, [upload.single('file'), reqValidator(CareersDto), fileValidator(['.pdf', '.docx'])],careerController.newApplicant.bind(careerController))

export default careerRoute