import { inject, injectable } from "tsyringe";
import { SubscribeDto } from "./subscribe.dto";
import SubscribeDatasource from "./subscribers.datasource";
import { ConflictError } from "../../../../shared/errors/errors";
import Subscribers from "../../../../database/entities/subscribers.entities";




@injectable()
class SubscribeService {

    constructor(@inject(SubscribeDatasource) private subscribeDatasource: SubscribeDatasource){}
    async subscribe(data: SubscribeDto){
        try {
            const { email } = data
            const subExist = await this.subscribeDatasource.findSubscriber(email)
            if(subExist) throw new ConflictError('User already subscribed.')
            const subscriber = new Subscribers()
            subscriber.email = email
            return await this.subscribeDatasource.createSubscriber(subscriber)

        } catch (error) {
            throw error
        }
    }

}

export default SubscribeService