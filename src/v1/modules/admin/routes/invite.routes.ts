import express from 'express'
import { container } from 'tsyringe'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { AcceptInviteDto, InviteDto } from '../dto/invite.dto'
import permissionsMiddleware from '../../../../shared/middleware/permissions.middleware'
import { validateIdParams } from '../../../../shared/middleware/validate-id-params.middleware'
import InviteController from '../controllers/invite.controllers'
const inviteRouter = express.Router()


const inviteController = container.resolve(InviteController)

inviteRouter
.post('/send-invite', [authMiddleware, permissionsMiddleware('send_invite'), reqValidator(InviteDto)], inviteController.sendInvite.bind(inviteController))
.post('/accept-invite/:id', [reqValidator(AcceptInviteDto)], inviteController.acceptInvite.bind(inviteController))
export default inviteRouter