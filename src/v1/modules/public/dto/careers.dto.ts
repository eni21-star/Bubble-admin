import { IsEmail, isNotEmpty, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";


export class CareersDto {

    @IsString()
    @IsNotEmpty()
    fullName!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @Length(11,15)
    contactNumber!: string
}