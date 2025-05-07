import { inject, injectable } from "tsyringe";
import { CareersDto } from "../dto/careers.dto";
import CareerDatasource from "../datasource/careera.datasource";
import sendMailer from "../../../../shared/assets/email/application";
import appConfig from "../../../../config/app.config";



@injectable()
class CareerServices {

    constructor(@inject(CareerDatasource) private careerDatasource: CareerDatasource){}
    async newApplicant(data: CareersDto, file: Express.Multer.File){
        try {


            const { email, contactNumber, fullName} = data
            
            await sendMailer(fullName, email, contactNumber, file)

            return await this.careerDatasource.newApplicant(data)
            
        } catch (error) {
            throw error
        }
    }
}

export default CareerServices