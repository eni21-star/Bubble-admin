import express from 'express'
const refreshTokenRouter = express.Router()
import { container } from 'tsyringe'
import RefreshTokenController from './refreshToken.controllers'

const refreshTokenController = container.resolve(RefreshTokenController)

refreshTokenRouter
.post('/new-token', refreshTokenController.getAccessToken.bind(refreshTokenController))


export default refreshTokenRouter