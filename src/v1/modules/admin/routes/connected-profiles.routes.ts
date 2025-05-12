import express from 'express'
const connectedProfileRoute = express.Router()
import ConnectedProfileController from '../controllers/connected-profiles.controllers'
import { container } from 'tsyringe'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'

const connectedProfileController = container.resolve(ConnectedProfileController)


connectedProfileRoute
.get('/connected-profiles', authMiddleware ,connectedProfileController.getConnectedProfiles.bind(connectedProfileController))

export default connectedProfileRoute