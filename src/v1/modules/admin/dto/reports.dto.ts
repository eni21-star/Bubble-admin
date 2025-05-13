import { IsString, Length } from "class-validator";


export class ReportsDto {

    @IsString()
    @Length(4,25)
    title!: string
    
    @IsString()
    @Length(4,25)
    section!: string

}