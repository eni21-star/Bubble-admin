import { IsAlpha, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";



export class CreateBlogDto {

    @IsString()
    title!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(50, { message: 'Content must be at least 50 characters long' })
    content!: string;

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