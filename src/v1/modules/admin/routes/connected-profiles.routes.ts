import express from 'express'
const connectedProfileRoute = express.Router()
import ConnectedProfileController from '../controllers/connected-profiles.controllers'
import { container } from 'tsyringe'

const connectedProfileController = container.resolve(ConnectedProfileController)


connectedProfileRoute
.get('/connected-profiles', connectedProfileController.getConnectedProfiles.bind(connectedProfileController))

export default connectedProfileRoute