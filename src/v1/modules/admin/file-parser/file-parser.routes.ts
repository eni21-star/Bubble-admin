import express from 'express'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import multer from 'multer';


import FileParserController from './file-parser.controller';
import { container } from 'tsyringe';
import { fileValidator } from '../../../../shared/utils/file-validator.utils';

const fileParserController = container.resolve(FileParserController)
const storage = multer.memoryStorage();
const upload = multer({ storage,  limits: { fileSize: 5 * 1024 * 1024 } });




const fileParserRouter = express.Router()


fileParserRouter
.post('/parse-file', [authMiddleware, upload.single('file'), fileValidator(['.csv', '.xlsx', '.xls'])], fileParserController.parseFile.bind(fileParserController))

export default fileParserRouter
