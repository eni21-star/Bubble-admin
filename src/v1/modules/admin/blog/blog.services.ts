import { inject, injectable } from "tsyringe";
import { ReqAdmin } from "../../../../shared/types/req.types";
import { CreateBlogDto, UpdateeBlogDto } from "./blog.dto";
import AuthDatasource from "../auth/auth.datasource";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "../../../../shared/errors/errors";
import uploadImage from "../../../../shared/cloudinary/upload.cloudinary";
import Blog from "../../../../database/entities/blog.entities";
import Images from "../../../../database/entities/images.entities";
import BlogDatasource from "./blog.datasource";

@injectable()
class BlogServices {

    constructor(
        @inject(AuthDatasource) private authDatasource: AuthDatasource,
        @inject(BlogDatasource) private blogDatasource: BlogDatasource
    ){}

    async createBlog(admin: ReqAdmin, data: CreateBlogDto, file: Express.Multer.File[]): Promise<any>{

        try {

            const { id } = admin
            console.log(file[0])
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('Please create an account to proceed')

            const images = await uploadImage(file) as any


            const newBlog = new Blog()
            newBlog.content = data.content
            newBlog.title = data.title
            newBlog.images = images
            newBlog.createdBy = userExist
            userExist.blogs?.push(newBlog)

            const createBlog = await this.blogDatasource.newBlog(userExist, newBlog)
            return createBlog

            
        } catch (error) {
            throw error
        }
    }

    async updateBlog(admin: ReqAdmin, data: {data:UpdateeBlogDto, id: string}, file: any){

        try {

            const { id } = admin
            const { title, content } = data.data
            const userExist = await this.authDatasource.findById(id)
            if(!userExist) throw new NotFoundError('Please create an account to proceed')
            
            let findBlog = await this.blogDatasource.findBlog(data.id)
            if(!findBlog) throw new NotFoundError('Blog does not exist.')
            
            const userBlogs = userExist.blogs 

            let userPermitted: boolean = userBlogs?.some(
                (blog) => findBlog.createdBy?.id === userExist.id
              ) ?? false;


            if(!userPermitted || userExist.role != 'SUPERADMIN') throw new ForbiddenError('You do not have permission to do this')
               
            let images: any = []
            if(file.length > 0){
                 images = await uploadImage(file) as any
            }

            if(images.length>0) findBlog.images = images
            findBlog.title = title ? title : findBlog.title
            findBlog.content = content ? content : findBlog.content

            return await this.blogDatasource.saveUpdate(findBlog)
        
        } catch (error) {
            throw error
        }
        
    }

    async getBlogById(id: string): Promise<any>{

        try {
            
            const findBlog = await this.blogDatasource.findBlog(id)
            if(!findBlog) throw new NotFoundError('Blog not found.')
            return findBlog

        } catch (error) {
            throw error
        }
    }

    async getAllBlogs(data: { page: number, limit: number}): Promise<any>{
       
        try {
            
            const { page, limit } = data
            return await this.blogDatasource.getAllBlogs(page, limit)

        } catch (error) {
            throw error
        }
    }

    async deleteBlog(id: string, admin: ReqAdmin): Promise<any>{
        try {
            

            const userExist = await this.authDatasource.findById(admin.id)
            if(!userExist) throw new NotFoundError('Please create an account to proceed')

            const findBlog = await this.blogDatasource.findBlog(id)
            if(!findBlog) throw new NotFoundError('Blog not found.')        
            
            const userBlogs = userExist.blogs

            let userPermitted  = userBlogs?.some(
                (blog)=> blog.id === findBlog.id
            ) ?? false

            if(!userPermitted || userExist.role != 'SUPERADMIN') throw new ForbiddenError('You do not have permission to do this.')

            const deleteBlog = await this.blogDatasource.deleteBlog(id, findBlog)
            return { deleteBlog }

            } catch (error) {
            throw error
        }
    }
}

export default BlogServices