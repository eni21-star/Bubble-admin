import express from 'express'
import multer from 'multer'
import { container } from 'tsyringe';
import ReportsController from '../controllers/reports.controllers';
import { authMiddleware } from '../../../../shared/middleware/auth.middleware';
import { fileValidator } from '../../../../shared/middleware/file-validator.utils';
import permissionsMiddleware from '../../../../shared/middleware/permissions.middleware';
import { reqValidator } from '../../../../shared/middleware/validation.middleware';
import { ReportsDto } from '../dto/reports.dto';
import { validateIdParams } from '../../../../shared/middleware/validate-id-params.middleware';
const reportsRouter = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage,  limits: { fileSize: 5 * 1024 * 1024 } });

const reportsController = container.resolve(ReportsController)

reportsRouter
.post('/new-report', [authMiddleware, upload.array('file'), fileValidator(['.pdf', '.docx', '.csv', '.xlsx', '.xls', '.jpg', '.png','.jpeg']), permissionsMiddleware('upload_report'), reqValidator(ReportsDto) ], reportsController.newReport.bind(reportsController))
.delete('/delete-report/:id', [authMiddleware, permissionsMiddleware('delete_report'), validateIdParams], reportsController.deleteReport.bind(reportsController))


export default reportsRouter