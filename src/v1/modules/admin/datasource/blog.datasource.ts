import { injectable } from "tsyringe";
import AppDataSource from "../../../../database";
import Admin from "../../../../database/entities/admin.entities";
import Blog from "../../../../database/entities/blog.entities";
import Images from "../../../../database/entities/images.entities";
import { CreateBlogDto } from "../dto/blog.dto";

const blogRepo = AppDataSource.getRepository(Blog)
const imageRepo = AppDataSource.getRepository(Images)

@injectable()
class BlogDatasource {

    async newBlog(admin: Admin, blog: Blog){
      const { createdBy, ...rest} =  await blogRepo.save(blog)
      return rest
    }

    async findBlog(id: string){
        return await blogRepo.findOne({ where: {id}, relations:['images', 'createdBy']})
    }

    async saveUpdate(blog: Blog){
        return await blogRepo.save(blog)
    }

    async getAllBlogs(page: number, limit: number){

        const [data, total] = await blogRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
              createdAt: 'DESC', 
            },
            relations: ['images']
          });
        return { data, total, page, lastPage: Math.ceil(total / limit) }
        }

    async deleteBlog(id: string, blog: Blog){
      
       await imageRepo.delete({blog})
       return await blogRepo.delete({id})
    }

}

export default BlogDatasource