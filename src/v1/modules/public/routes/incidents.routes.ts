import express from 'express'
const incidentRouter = express.Router()
import IncidentsController from '../controllers/inicidents.controllers'
import { container } from 'tsyringe'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { IncidentDto } from '../dto/incidents.dto'
import multer from 'multer'


const upload = multer({ dest: 'uploads/' })
const incidentController = container.resolve(IncidentsController)

incidentRouter
.post('/incidents/submit', [upload.array('image'), reqValidator(IncidentDto)], incidentController.submitIncident.bind(incidentController))

export default incidentRouter