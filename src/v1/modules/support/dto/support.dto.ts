import { IsString, isUUID } from "class-validator";


export class TicketMessageDto {

    @IsString()
    message!: string

}


export class AdminTicketMessageDto {
    @IsString()
    message!: string

    @IsString()
    ticketId!: string
}

export class UserTicketMessageDto {

    @IsString()
    message!: string

    @IsString()
    ticketId!: string

    @IsString()
    userId!: string
    
}

export class ResolveTicketDto {

    @IsString()
    ticketId!: string
    
}