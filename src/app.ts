import 'express-async-errors';
import express, { Application, NextFunction, Request, Response } from 'express'
import './shared/errors/errors'
import { BadreqError, CustomError, errorHandler } from './shared/errors/errors'
import authRouter from './v1/modules/admin/auth/auth.routes'
import { RouteVersion } from './config/route.config'
import healthRouter from './v1/modules/health/health.route'
import cookieParser from 'cookie-parser';
import multer from 'multer';
import refreshTokenRouter from './v1/modules/admin/auth/refreshToken.routes';
import blogRouter from './v1/modules/admin/blog/blog.routes';
import appRouter from './v1/modules/app/app.routes';
import inviteRouter from './v1/modules/admin/invite/invite.routes';
import imageRouter from './v1/modules/admin/images/images.routes';
import careerRoute from './v1/modules/admin/careers/careers.routes';
import fileParserRouter from './v1/modules/admin/file-parser/file-parser.routes';
import popupRouter from './v1/modules/admin/popup/popup.routes';
import helmet from 'helmet'
import cors from 'cors'
import { logger } from './shared/utils/logger/logger';
const app: Application = express()


app.use(express.json())
app.use(cookieParser())
app
  .use(helmet())
  .use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:3000',
      ],
    }),
)

app.use('/app', appRouter)
app.use('/health', healthRouter)
app.use(`/api/${RouteVersion.v1}`, authRouter)
app.use(`/api/${RouteVersion.v1}`, refreshTokenRouter)
app.use(`/api/${RouteVersion.v1}`, blogRouter)
app.use(`/api/${RouteVersion.v1}`, inviteRouter)
app.use(`/api/${RouteVersion.v1}`, imageRouter)
app.use(`/api/${RouteVersion.v1}`, careerRoute)
app.use(`/api/${RouteVersion.v1}`, fileParserRouter)
app.use(`/api/${RouteVersion.v1}`, popupRouter)



app.use(errorHandler)
export default app