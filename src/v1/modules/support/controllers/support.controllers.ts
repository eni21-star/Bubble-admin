import { NextFunction, Request, Response } from "express"
import { AdminTicketMessageDto, ResolveTicketDto, TicketMessageDto, UserTicketMessageDto } from "../dto/support.dto"
import { inject, injectable } from "tsyringe"
import SupportService from "../services/support.services"
import { SuccessResponse } from "../../../../shared/utils/response.utils"
import { firebaseDB } from "../../../../shared/firebase/firebase"
import { ReqAdmin } from "../../../../shared/types/req.types"
import { BadreqError } from "../../../../shared/errors/errors"

@injectable()
class SupportController { 
    constructor(@inject(SupportService) private supportService: SupportService){}
    async newTicket(req: Request, res: Response, next: NextFunction): Promise<any>{
        
        try {

            const data = req.body as TicketMessageDto

            const response = await this.supportService.newTicket(data)
            return res.status(200).json(SuccessResponse('New Ticket opened.', response))
            
        } catch (error) {
            next(error)
        }
    }

    async assignAdmin(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {
            
            const admin = (req as any).admin as ReqAdmin
            const data = req.body as ResolveTicketDto

            await this.supportService.assignAdmin(data, admin)
            return res.status(200).json(SuccessResponse('Admin assigned.'))

        } catch (error) {
            next(error)
        }

    }

    async adminReplyToTicket(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
            const data = req.body as AdminTicketMessageDto
            const admin = (req as any).admin as ReqAdmin

            const response = await this.supportService.adminReplyToTicket(data, admin)
            return res.status(200).json(SuccessResponse('Admin message sent.'))
        } catch (error) {
            next(error)
        }
    }


    async userReplyToTicket(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
            const data = req.body as UserTicketMessageDto

            const response = await this.supportService.userReplyToTicket(data)
            return res.status(200).json(SuccessResponse('User message sent.'))
        } catch (error) {
            next(error)
        }
    }

    async resolveTicket(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const admin = (req as any).admin as ReqAdmin
            const data = req.body as ResolveTicketDto

            const response = await this.supportService.resolveTicket(data, admin)
            return res.status(200).json(SuccessResponse('Ticket Resolved'))
        } catch (error) {
            next(error)
        }
    }

    async getTicket(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {

            const data = String(req.params.id)
            console.log(data)
            if(!data.startsWith('TICKET')) throw new BadreqError('Ticket id is of invalid format.')
            const response = await this.supportService.getTicket(data)
            return res.status(200).json(SuccessResponse('Ticket Retrieved.', response))

        } catch (error) {
            next(error)
        }
    }

    async getAdminTicketHistory(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {
            
            const admin = (req as any).admin as ReqAdmin
            const response = await this.supportService.getAdminTicketHistory(admin)
            return res.status(200).json(SuccessResponse('Tickets retrieved', response))

        } catch (error) {
            next(error)
        }
    }

    async getAllOpenTickets(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            
            const response = await this.supportService.getAllOpenTickets()
            return res.status(200).json(SuccessResponse('Retrieved open tickets', response))
            
        } catch (error) {
            next(error)
        }
    }
}

export default SupportController