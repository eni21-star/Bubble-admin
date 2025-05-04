import express from 'express'
import { container } from 'tsyringe'
import SubscribeController from './suscribe.controllers'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { SubscribeDto } from './subscribe.dto'
const subscribebRoute = express.Router()

const subscribeController = container.resolve(SubscribeController)

subscribebRoute
.post('/subscribe', reqValidator(SubscribeDto), subscribeController.subscribe.bind(subscribeController))

export default subscribebRoute