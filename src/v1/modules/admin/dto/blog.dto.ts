import { IsAlpha, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { subSidiaryArray } from "../../../../config/subsidiaries.config";



export class CreateBlogDto {

    @IsString()
    title!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(50, { message: 'Content must be at least 50 characters long' })
    content!: string;

    @IsIn(subSidiaryArray)
    @IsNotEmpty()
    subsidiary!: string
}


export class UpdateeBlogDto {

 
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
  //  @MinLength(50, { message: 'Content must be at least 50 characters long' })
    content?: string;

}

export class GetBlogBySubsidiaryDto {

    @IsIn(subSidiaryArray)
    @IsNotEmpty()
    subsidiary!: string

}