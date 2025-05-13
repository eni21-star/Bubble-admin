import { inject, injectable } from "tsyringe";
import AuthDatasource from "../datasource/auth.datasource";
import { ReqAdmin } from "../../../../shared/types/req.types";
import { NotFoundError } from "../../../../shared/errors/errors";

@injectable()
class ProfileServices {
  constructor(@inject(AuthDatasource) private authDatasource: AuthDatasource) {}
  async getProfile(admin: ReqAdmin) {
    try {
      const { id } = admin;
      const userExist = await this.authDatasource.findByIdProfile(id);
      if (!userExist) throw new NotFoundError("User does not exist.");

      return userExist;
    } catch (error) {
      throw error;
    }
  }

  async deleteProfile(admin: ReqAdmin) {
    try {
      const { id } = admin;
      const userExist = await this.authDatasource.findByIdProfile(id);
      if (!userExist) throw new NotFoundError("User does not exist.");

      return await this.authDatasource.deletAdminById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileServices;
