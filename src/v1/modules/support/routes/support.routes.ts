import express from 'express'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { AdminTicketMessageDto, ResolveTicketDto, TicketMessageDto, UserTicketMessageDto } from '../dto/support.dto'
import { container } from 'tsyringe'
import SupportController from '../controllers/support.controllers'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
const newTicketRouter = express.Router()

const supportController = container.resolve(SupportController)

newTicketRouter
.post('/support/new-ticket', reqValidator(TicketMessageDto), supportController.newTicket.bind(supportController))
.post('/support/admin-reply', [authMiddleware, reqValidator(AdminTicketMessageDto)], supportController.adminReplyToTicket.bind(supportController))
.post('/support/user-reply', reqValidator(UserTicketMessageDto), supportController.userReplyToTicket.bind(supportController))
.post('/support/resolve-ticket', [authMiddleware, reqValidator(ResolveTicketDto)], supportController.resolveTicket.bind(supportController))
.get(`/support/get-ticket/:id`, supportController.getTicket.bind(supportController))
.post('/support/assign-admin', [authMiddleware, reqValidator(ResolveTicketDto)], supportController.assignAdmin.bind(supportController))
.get('/support/get-tickets', authMiddleware, supportController.getAdminTicketHistory.bind(supportController))
.get('/support/open-tickets', supportController.getAllOpenTickets.bind(supportController))

export default newTicketRouter