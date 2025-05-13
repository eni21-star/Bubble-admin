import { injectable } from "tsyringe";
import AppDataSource from "./../../../../database";
import Admin from "../../../../database/entities/admin.entities";
import RefreshToken from "../../../../database/entities/refresh-token.entities";
import { RegisterDto } from "../dto/auth.dto";

const adminRepo = AppDataSource.getRepository(Admin);

@injectable()
class AuthDatasource {
  async findByEmail(email: string) {
    return await adminRepo
      .createQueryBuilder("admin")
      .addSelect("admin.password")
      .where("admin.email = :email", { email })
      .getOne();
  }

  async newAdmin(data: RegisterDto) {
    const admin = adminRepo.create(data);
    const save = await adminRepo.save(admin);
    const { password, ...rest } = save;
    return rest;
  }

  async newInvitedAdmin(data: Admin) {
    const save = await adminRepo.save(data);
    const { password, ...rest } = save;
    return rest;
  }

  async findById(id: string) {
    return await adminRepo.findOne({
      where: { id },
      relations: ["blogs", "blogs.images", "reports"],
    });
  }

  async findByIdProfile(id: string) {
    return await adminRepo.findOne({
      where: { id },
      relations: [
        "blogs",
        "blogs.images",
        "reports",
        "invitedUsers",
        "imagesUploaded",
      ],
    });
  }

  async updateUser(admin: Admin) {
    const existing = await adminRepo.findOneOrFail({ where: { id: admin.id } });

    const toUpdate = adminRepo.merge(existing, admin);
    const { password, ...rest } = await adminRepo.save(toUpdate);
    return rest;
  }

  async findInviteByToken(token: string){
    return await adminRepo.findOne({ where: { invitationToken: token} })
   }

  async deletAdminById(id: string) {
    return await adminRepo.delete(id);
  }
}

export default AuthDatasource;
