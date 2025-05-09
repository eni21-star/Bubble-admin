import { IsEmail, IsIn, IsString, IsStrongPassword, Length } from "class-validator";


export class InviteDto {

    @IsEmail()
    email!: string

    @IsString()
    @IsIn(['ADMIN', 'SUPPORT'])
    role!: string

}

export class AcceptInviteDto {

    @IsString()
    @Length(4,8)
    username!: string

    @IsStrongPassword()
    @Length(6,12)
    password!: string

}