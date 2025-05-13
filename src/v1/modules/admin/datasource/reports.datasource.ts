import AppDataSource from "../../../../database";
import Admin from "../../../../database/entities/admin.entities";
import Reports from "../../../../database/entities/reports.entities";

const reportsRepo = AppDataSource.getRepository(Reports)
class ReportsDatasource {

    async newReport(report: Reports){
        return await reportsRepo.save(report)
    }

    async findReportById(id: string){
        return await reportsRepo.findOne({ where: { id }, relations: ['createdBy']})
    }

    async deleteReport(id: string, admin: Admin){
         return await reportsRepo.delete(id)
    }
}

export default ReportsDatasource