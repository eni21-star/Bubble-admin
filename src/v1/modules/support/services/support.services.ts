import { injectable, inject } from "tsyringe";
import { TicketMessageDto, AdminTicketMessageDto, UserTicketMessageDto, ResolveTicketDto } from "../dto/support.dto";
import { v4 as uuidv4 } from 'uuid'
import AuthDatasource from "../../admin/datasource/auth.datasource";
import SupportDatasource from "../datasource/support.datasource";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../../../../shared/errors/errors";
import { firebaseDB } from "../../../../shared/firebase/firebase";
import { ReqAdmin } from "../../../../shared/types/req.types";

@injectable()
class SupportService {

    constructor(
        @inject(SupportDatasource) private supportDatasource: SupportDatasource,
        @inject(AuthDatasource) private authDatasource: AuthDatasource
){}
    async newTicket(data: TicketMessageDto){
        try {
            
            const userMessage = data.message
            const userId = `USER_${uuidv4()}`
            const ticketId = `TICKET_${uuidv4()}`
            const date =  Date.now()

            // const availableAdmin = await this.supportDatasource.findAvailableagent()
            // if(!availableAdmin) throw new NotFoundError('No available support at the moment')
            
            const message = {
                [uuidv4()]: { senderId: userId, message: userMessage, timestamp: date },
                [uuidv4()]: {senderId: 'system', message: null, timestamp: date}
            }

            const ticket = {
                ticketId,
                userId,
                messages: message,
                assignedAgent: null,
                status: 'OPEN',
                createdAt: date
            }

            await firebaseDB.ref(`supportChats/${ticketId}`).set(ticket)
            return { ticketId, userId }

        } catch (error) {
            throw error
        }
    }

    async assignAdmin(data: ResolveTicketDto, admin: ReqAdmin ){

        try {

            const { ticketId } = data
            const { id } = admin
            const snapshot = await firebaseDB.ref(`supportChats/${ticketId}`).once('value')
            if(!snapshot.val() || snapshot.val().status !== 'OPEN') throw new NotFoundError('Ticket does not exist or has been closed.')
            if(snapshot.val().assignedAgent) throw new ForbiddenError('An agent has already been assigned to this Ticket.')
            
            await firebaseDB.ref(`supportChats/${ticketId}`).update({ assignedAgent: id})

        } catch (error) {
            throw error
        }
    }

    async adminReplyToTicket(data: AdminTicketMessageDto, admin: ReqAdmin){
        try {

            const { id } = admin
            const date = Date.now()
            const { ticketId } = data
            const adminExist = await this.authDatasource.findById(id)
            if(!adminExist) throw new NotFoundError('Admin does not exist, please create an account')
            
            
            const snapshot = await firebaseDB.ref(`supportChats/${ticketId}`).once('value')
            if(snapshot.val().status != 'OPEN') throw new ForbiddenError('Ticket is not open.')

            const message = {
                [uuidv4()]: { senderId: admin.id, message: data.message, timestamp: date}
            }

            await firebaseDB.ref(`supportChats/${ticketId}/messages`).update(message)
            
            
        } catch (error) {
            throw error
        }
    }

    async userReplyToTicket(data: UserTicketMessageDto){
        try {
            
            const { userId, ticketId } = data
            const date = Date.now()

            const message = {
                [uuidv4()] : { senderId: userId, message: data.message, timestamp: date}
            }

            const snapshot = await firebaseDB.ref(`supportChats/${ticketId}`).once('value')
            const assignedAgent = snapshot.val().assignedAgent
            if(snapshot.val().status != 'OPEN') throw new ForbiddenError('Ticket is not open.')

            await firebaseDB.ref(`supportChats/${ticketId}/messages`).update(message)
        } catch (error) {
            throw error
        }
    }

    async resolveTicket(data: ResolveTicketDto, admin: ReqAdmin){
        try {

            const date = Date.now()
            const { ticketId } = data
            const adminExist = await this.authDatasource.findById(admin.id)
            if(!adminExist) throw new NotFoundError('Admin does not exist, please create an account')

            const snapshot = await firebaseDB.ref(`supportChats/${ticketId}`).once('value')
            if(!snapshot.val()) throw new NotFoundError('Ticket not found.')
            const assignedAgent = snapshot.val().assignedAgent

            if(adminExist.id !== assignedAgent) throw new UnauthorizedError('You were not assigned to this Ticket.')
            
            await firebaseDB.ref(`supportChats/${ticketId}`).update({ status: 'RESOLVED', resolvedAt: date })
            adminExist.isAvailable = true
            await this.authDatasource.updateUser(adminExist)
            
        } catch (error) {
            throw error
        }
    }

    async getTicket(ticketId: string){
        try {

            console.log(ticketId)
            const snapshot = await firebaseDB.ref(`supportChats/${ticketId}`).once('value')
            if(!snapshot) throw new NotFoundError('Ticket does not exist')
            console.log(snapshot.val().messages)
            const rawMessages = snapshot.val().messages

            const data =  Object.entries(rawMessages)
             .sort(([, a], [, b]) => {return (a as any).timestamp - (b as any).timestamp})
             .map(([id, data]) => {
               return {
                 id,
                 ...(data as Record<string, any>), 
               };
             });

            return data

        } catch (error) {
            throw error
        }
    }

    async getAdminTicketHistory(admin: ReqAdmin){
        try {
            
            const { id } = admin
            const adminExist = await this.authDatasource.findById(id)
            if(!adminExist) throw new NotFoundError('Admin does not exist, please create an account')

                const snapshot = await firebaseDB.ref(`supportChats/`).once('value')
                const tickets = snapshot.val();
                const ticketArray = Object.values(tickets).filter((ticket: any) => ticket.assignedAgent === id);
            return ticketArray

        } catch (error) {
            throw error
        }
    }

    async getAllOpenTickets(){
        try {
            
            const snapshot = await firebaseDB.ref(`supportChats/`).once('value') 
            const tickets = snapshot.val();
            const ticketArray = Object.values(tickets).filter((ticket: any) => ticket.status === 'OPEN' && !ticket.assignedAgent );
            return ticketArray
            
        } catch (error) {
            throw error
        }
    }
}

export default SupportService