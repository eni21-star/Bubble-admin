import { IsBoolean, IsEmail, IsOptional, isString, IsString, Length } from "class-validator";





export class CreatePopupDto {

    @IsString()
    @Length(4, 15)
    fullName!: string

    @IsEmail()
    email!: string

    @IsString()
    @Length(10, 15)
    phoneNumber!: string

    @IsString()
    stateOfResidence!: string

}

export class UpdatePopupDto {

    @IsString()
    @IsOptional()
    @Length(4, 15)
    fullName?: string

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    @Length(10, 15)
    phoneNumber?: string

    @IsString()
    @IsOptional()
    stateOfResidence?: string

    @IsBoolean()
    @IsOptional()
    isEnabled?: boolean

}