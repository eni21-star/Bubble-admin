import 'reflect-metadata'
import { IsEmail, IsIn, IsOptional, IsString, IsStrongPassword, Length } from 'class-validator'


export class RegisterDto {

    @IsEmail()
    email!: string

    @IsString()
    @Length(4,8)
    username!: string

    @IsStrongPassword()
    @Length(6,12)
    password!: string

    @IsString()
    @IsIn(['ADMIN', 'SUPERADMIN', 'SUPPORT'])
    role!: string

    @IsOptional()
    permissions?: Array<string>

    @IsOptional()
    isAvailable?: boolean

}

export class LoginDto {
    @IsEmail()
    email!: string 

    @IsString()
    password!: string
}