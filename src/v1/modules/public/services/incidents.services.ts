import { inject, injectable } from "tsyringe";
import IncidentDatasource from "../datasource/incidents.datasource";
import { IncidentDto } from "../dto/incidents.dto";
import uploadImage from "../../../../shared/cloudinary/upload-image.cloudinary";
import sendIncidentReport from "../../../../shared/assets/email/incidents.email";
import Incidents from "../../../../database/entities/incidents.entities";



@injectable()
class IncidentService {
    constructor(@inject(IncidentDatasource) private incidentDatasource: IncidentDatasource){}

    async submitIncident(data: IncidentDto, file: Express.Multer.File[]){
        try {

            const { insuredName, policyNumber, description } = data 
            await sendIncidentReport(insuredName, policyNumber, description, file[0])

            const images = await uploadImage(file)
            const newIncident = new Incidents()
            newIncident.description = description
            newIncident.insuredName = insuredName
            newIncident.policyNumber = policyNumber
            newIncident.imageUrl = images[0].imageUrl

            return await this.incidentDatasource.submitIncident(newIncident)
            
        } catch (error) {
            throw error
        }
    }
}

export default IncidentService