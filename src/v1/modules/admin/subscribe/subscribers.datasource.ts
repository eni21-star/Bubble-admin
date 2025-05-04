import { injectable } from "tsyringe";
import AppDataSource from "../../../../database";
import Subscribers from "../../../../database/entities/subscribers.entities";


const subRepo = AppDataSource.getRepository(Subscribers)

@injectable()
class SubscribeDatasource {

    async findSubscriber(email: string){
        return await subRepo.findOne({ where: { email }})
    }

    async createSubscriber(subscriber: Subscribers){
        return await subRepo.save(subscriber)
    }
    
}

export default SubscribeDatasource