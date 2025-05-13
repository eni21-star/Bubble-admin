import express from "express";
const authRouter = express.Router();
import { container } from "tsyringe";
import { reqValidator } from "../../../../shared/middleware/validation.middleware";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import AuthController from "../controllers/auth.controllers";

const authController = container.resolve(AuthController);

authRouter
  .post(
    "/register",
    reqValidator(RegisterDto),
    authController.register.bind(authController)
  )
  .post(
    "/login",
    reqValidator(LoginDto),
    authController.login.bind(authController)
  );

export default authRouter;
