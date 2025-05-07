import { IsNotEmpty, isString, IsString } from "class-validator";


export class IncidentDto {

    @IsString()
    @IsNotEmpty()
    insuredName!: string

    @IsString()
    policyNumber!: string

    @IsString()
    description!: string

}