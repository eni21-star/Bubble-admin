import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { isLength } from "validator";



export class SubscribeDto {

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    firstName!: string


    @IsString()
    lastName!: string

}