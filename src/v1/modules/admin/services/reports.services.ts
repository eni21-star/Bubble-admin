import { inject, injectable } from "tsyringe";
import { ReqAdmin } from "../../../../shared/types/req.types";
import { ReportsDto } from "../dto/reports.dto";
import AuthDatasource from "../datasource/auth.datasource";
import { ForbiddenError, NotFoundError } from "../../../../shared/errors/errors";
import uploadFile from "../../../../shared/cloudinary/upload-file.cloudinary";
import Reports from "../../../../database/entities/reports.entities";
import ReportsDatasource from "../datasource/reports.datasource";


@injectable()
class ReportsServices {

    constructor(
        @inject(AuthDatasource) private authDatasource: AuthDatasource,
        @inject(ReportsDatasource) private reportsDatasource: ReportsDatasource){}
    async newReport(data: ReportsDto, file: Express.Multer.File[], admin: ReqAdmin){

        try {
            
            const { title, section, type } =  data
            const { id } = admin
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('User does not exist.')

            const fileUrl = await uploadFile(file)

            const newReport = new Reports()
            newReport.createdBy = userExist
            newReport.fileUrl = fileUrl[0].fileUrl
            newReport.title = title
            newReport.section = section
            newReport.type = type

            const response =  await this.reportsDatasource.newReport(newReport)
            const { createdBy, ...rest } = response
            return { createdBy: {username: createdBy.username, email: createdBy.email, id: createdBy.id}, rest}

        } catch (error) {
            throw error
        }
    }

    async getReports(type: string, page: number, limit: number){
        return await this.reportsDatasource.getReports(type, page, limit)
    }

    async deleteReport(reportId: string,  admin: ReqAdmin){

        try {

            const { id } = admin
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('User does not exist.')

            const reportExist = await this.reportsDatasource.findReportById(reportId)
            if(!reportExist)  throw new NotFoundError('Report or resource does not exist.')

            if(userExist.id !== reportExist.createdBy.id && userExist.role !== 'SUPERADMIN') throw new ForbiddenError('You are not permitted to do this.')
            
            return await this.reportsDatasource.deleteReport(reportId, userExist)
            
        } catch (error) {
            throw error
        }
    }
}


export default ReportsServices