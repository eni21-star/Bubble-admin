import express from 'express'
const blogRouter = express.Router()
import multer from 'multer'
import { authMiddleware } from '../../../../shared/middleware/auth.middleware'
import { container } from 'tsyringe'
import { reqValidator } from '../../../../shared/middleware/validation.middleware'
import { CreateBlogDto, UpdateeBlogDto } from '../dto/blog.dto'
import { validateIdParams } from '../../../../shared/middleware/validate-id-params.middleware'
import permissionsMiddleware from '../../../../shared/middleware/permissions.middleware'
import BlogController from '../controllers/blog.controllers'

const blogController = container.resolve(BlogController)

export const upload = multer({ dest: 'uploads/' })
blogRouter
.post('/new-blog', [authMiddleware, upload.array('images'), permissionsMiddleware('create_blog'), reqValidator(CreateBlogDto)], blogController.createBlog.bind(blogController))
.put('/update-blog/:id', [authMiddleware, upload.array('images'),permissionsMiddleware('update_blog'), validateIdParams, reqValidator(UpdateeBlogDto)], blogController.updateBlog.bind(blogController) )
.get('/blog/:id', validateIdParams, blogController.getBlogById.bind(blogController))
.get('/blogs', blogController.getAllBlogs.bind(blogController))
.get('/blogs/subsidiary/:id', blogController.getBlogsBySubsidiary.bind(blogController))
.delete('/blog/:id', [validateIdParams, authMiddleware, permissionsMiddleware('delete_blog')], blogController.deleteBlog.bind(blogController))
export default blogRouter