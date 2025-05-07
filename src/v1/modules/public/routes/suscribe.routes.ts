import express from 'express'
import { container } from 'tsyringe'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { SubscribeDto } from '../dto/subscribe.dto'
import SubscribeController from '../controllers/suscribe.controllers'
const subscribebRoute = express.Router()

const subscribeController = container.resolve(SubscribeController)

subscribebRoute
.post('/subscribe', reqValidator(SubscribeDto), subscribeController.subscribe.bind(subscribeController))

export default subscribebRoute