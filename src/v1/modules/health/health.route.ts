import express from 'express'
import HealthController from './health.controller'
const healthRouter = express.Router()
import { container } from 'tsyringe'


const healthController = container.resolve(HealthController)

healthRouter.get('/health', healthController.chechHealth.bind(healthController))

export default healthRouter