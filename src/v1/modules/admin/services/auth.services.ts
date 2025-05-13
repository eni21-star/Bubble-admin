import { inject, injectable } from "tsyringe";
import { bcryptCompare, bcryptHash } from "../../../../shared/utils/hash.utils";
import {
  signAccessToken,
  signRefreshToken,
} from "../../../../shared/utils/jwt.utils";
import RefreshToken from "../../../../database/entities/refresh-token.entities";
import {
  defaultPermissions,
  superAdminPermissions,
} from "../../../../config/permissions.config";
import { logger } from "../../../../shared/utils/logger/logger";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import AuthDatasource from "../datasource/auth.datasource";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../../../shared/errors/errors";
import RefreshTokenDatasource from "../datasource/refreshToken.datasource";

@injectable()
class AuthService {
  constructor(
    @inject(AuthDatasource) private authDatasource: AuthDatasource,
    @inject(RefreshTokenDatasource)
    private refreshTokenDatasource: RefreshTokenDatasource
  ) {}
  async register(data: RegisterDto): Promise<any> {
    try {
      let { email, username, password, role } = data;
      const userExist = await this.authDatasource.findByEmail(email);
      if (userExist)
        throw new ConflictError(
          "Admin with that email already exists. Try loggin in."
        );

      data.password = await bcryptHash(password);
      data.email = email.toLowerCase();
      logger.info(role);

      if (role == "ADMIN") {
        data.permissions = defaultPermissions;
      } else if (role == "SUPPORT") {
        data.isAvailable = true;
        data.permissions = [];
      } else {
        data.permissions = superAdminPermissions;
      }

      const create = await this.authDatasource.newAdmin(data);
      return create;
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginDto) {
    try {
      const { email, password } = data;
      const userExist = await this.authDatasource.findByEmail(email);
      if (!userExist)
        throw new NotFoundError(
          "user does not exist. Please create an account"
        );

      const compare = await bcryptCompare(password, userExist.password);
      if (!compare) throw new UnauthorizedError("Incorrect password");

      const accessToken = signAccessToken({
        id: userExist.id,
        permissions: userExist.permissions as string[],
      });
      const refreshToken = signRefreshToken({ id: userExist.id });

      const saveRefresh = await this.refreshTokenDatasource.saveRefreshToken(
        userExist,
        refreshToken
      );
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
