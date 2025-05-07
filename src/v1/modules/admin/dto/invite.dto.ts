import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";


export class InviteDto {

    @IsEmail()
    email!: string

}

export class AcceptInviteDto {

    @IsString()
    @Length(4,8)
    username!: string

    @IsStrongPassword()
    @Length(6,12)
    password!: string

}