import express from 'express'
const appRouter = express.Router()
import AppController from './app.controller'
import { container } from 'tsyringe'

const appController = container.resolve(AppController)

appRouter.get('/app', appController.appController.bind(appController))

export default appRouter