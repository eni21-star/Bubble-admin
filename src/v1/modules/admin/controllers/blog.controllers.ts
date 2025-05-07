import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { ReqAdmin } from "../../../../shared/types/req.types";
import { SuccessResponse } from "../../../../shared/utils/response.utils";
import BlogServices from "../services/blog.services";
import { CreateBlogDto, UpdateeBlogDto } from "../dto/blog.dto";

@injectable()
class BlogController {

    constructor(
        @inject(BlogServices) private blogService: BlogServices
    ){}

    async createBlog(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const file = req.files as Express.Multer.File[]
            const data = req.body as CreateBlogDto
            const admin = (req as any).admin as ReqAdmin

            const response = await this.blogService.createBlog(admin, data, file)
            return res.status(201).json(SuccessResponse('Successfully created Blog', response))
            
        } catch (error) {
            next(error)
        }
    }

    async updateBlog(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const data = req.body as UpdateeBlogDto
            const file = req.files ? req.files : null
            const id = req.params.id
            const admin = (req as any).admin as ReqAdmin

            const response = await this.blogService.updateBlog(admin, {data, id}, file)
            return res.status(200).json(SuccessResponse('Blog Updated.', response))
            
        } catch (error) {
            next(error)
        }
    }

    async getBlogById(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const id = req.params.id

            const response = await this.blogService.getBlogById(id)
            return res.status(200).json(SuccessResponse('Fetched Blog Successfully.', response))
            
        } catch (error) {
            next(error)
        }
    }

    async getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {

            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10

            const response = await this.blogService.getAllBlogs({page, limit})
            return res.status(200).json(SuccessResponse('Fetched Blog Successfully.', response))
            
        } catch (error) {
            next(error)
        }
    }

    async deleteBlog(req: Request, res: Response, next: NextFunction): Promise<any>{

        try {
            
            const { id } = req.params

            const admin = (req as any).admin  as ReqAdmin
            const response = await this.blogService.deleteBlog(id, admin)
            return res.status(200).json(SuccessResponse('Blog deleted successfully.', response))
        } catch (error) {
            next(error)
        }
    }
}

export default BlogController