import { injectable } from "tsyringe";
import Subscribers from "../../../../database/entities/subscribers.entities";
import AppDataSource from "../../../../database";



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