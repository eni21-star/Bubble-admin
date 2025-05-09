import { inject, injectable } from "tsyringe";
import { SubscribeDto } from "../dto/subscribe.dto";
import { ConflictError } from "../../../../shared/errors/errors";
import Subscribers from "../../../../database/entities/subscribers.entities";
import SubscribeDatasource from "../datasource/subscribers.datasource";




@injectable()
class SubscribeService {

    constructor(
        @inject(SubscribeDatasource) private subscribeDatasource: SubscribeDatasource){}
    async subscribe(data: SubscribeDto){
        try {
            const { email, firstName, lastName } = data
            const subExist = await this.subscribeDatasource.findSubscriber(email)
            if(subExist) throw new ConflictError('User already subscribed.')
            const subscriber = new Subscribers()
            subscriber.email = email
            subscriber.firstName = firstName
            subscriber.lastName = lastName
            return await this.subscribeDatasource.createSubscriber(subscriber)

        } catch (error) {
            throw error
        }
    }

}

export default SubscribeService