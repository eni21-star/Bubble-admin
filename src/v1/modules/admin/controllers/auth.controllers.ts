import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { SuccessResponse } from "../../../../shared/utils/response.utils";
import appConfig from "../../../../config/app.config";
import AuthService from "../services/auth.services";

@injectable()
class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = req.body as RegisterDto;
      const response = await this.authService.register(data);
      return res.status(201).json(SuccessResponse("Admin created", response));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const data = req.body as LoginDto;
      const response = await this.authService.login(data);

      return res
        .status(200)
        .cookie("refreshToken", response.refreshToken, {
          httpOnly: true,
          secure: appConfig.app.env === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(
          SuccessResponse("Login Successful", {
            accessToken: response.accessToken,
          })
        );
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
