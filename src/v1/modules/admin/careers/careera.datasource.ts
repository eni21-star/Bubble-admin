import { injectable } from "tsyringe";
import { CareersDto } from "./careers.dto";
import AppDataSource from "../../../../database";
import Applicants from "../../../../database/entities/applicants.entities";


const applicantsRepo = AppDataSource.getRepository(Applicants)

@injectable()
class CareerDatasource {

    async newApplicant(data: CareersDto){

        const create = applicantsRepo.create(data)
        return await applicantsRepo.save(create)
    }
}

export default CareerDatasource