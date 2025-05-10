import express, { Application, NextFunction, Request, Response } from "express";
import "./shared/errors/errors";
import { BadreqError, CustomError, errorHandler } from "./shared/errors/errors";
import { RouteVersion } from "./config/route.config";
import healthRouter from "./v1/modules/health/health.route";
import cookieParser from "cookie-parser";
import multer from "multer";
import refreshTokenRouter from "./v1/modules/admin/routes/refreshToken.routes";
import blogRouter from "./v1/modules/admin/routes/blog.routes";
import appRouter from "./v1/modules/app/app.routes";
import inviteRouter from "./v1/modules/admin/routes/invite.routes";
import imageRouter from "./v1/modules/admin/routes/images.routes";
import careerRoute from "./v1/modules/public/routes/careers.routes";
import fileParserRouter from "./v1/modules/admin/routes/file-parser.routes";
import popupRouter from "./v1/modules/public/routes/popup.routes";
import helmet from "helmet";
import cors from "cors";
import { logger } from "./shared/utils/logger/logger";
import subscribebRoute from "./v1/modules/public/routes/suscribe.routes";
import authRouter from "./v1/modules/admin/routes/auth.routes";
import incidentRouter from "./v1/modules/public/routes/incidents.routes";
import newTicketRouter from "./v1/modules/support/routes/support.routes";
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet()).use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://fsl-admin.vercel.app",
    ],
  })
);

app.use("/app", appRouter);
app.use("/health", healthRouter);
app.use(`/api/${RouteVersion.v1}`, authRouter);
app.use(`/api/${RouteVersion.v1}`, refreshTokenRouter);
app.use(`/api/${RouteVersion.v1}`, blogRouter);
app.use(`/api/${RouteVersion.v1}`, inviteRouter);
app.use(`/api/${RouteVersion.v1}`, imageRouter);
app.use(`/api/${RouteVersion.v1}`, careerRoute);
app.use(`/api/${RouteVersion.v1}`, fileParserRouter);
app.use(`/api/${RouteVersion.v1}`, popupRouter);
app.use(`/api/${RouteVersion.v1}`, subscribebRoute);
app.use(`/api/${RouteVersion.v1}`, incidentRouter);
app.use(`/api/${RouteVersion.v1}`, newTicketRouter);

app.use(errorHandler);
export default app;
