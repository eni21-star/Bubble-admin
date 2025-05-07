import { injectable } from "tsyringe";
import { IncidentDto } from "../dto/incidents.dto";
import AppDataSource from "../../../../database";
import Incidents from "../../../../database/entities/incidents.entities";


const incidentRepo = AppDataSource.getRepository(Incidents)
@injectable()
class IncidentDatasource {
    
    async submitIncident(data: Incidents){
        return await incidentRepo.save(data)
    }

}

export default IncidentDatasource