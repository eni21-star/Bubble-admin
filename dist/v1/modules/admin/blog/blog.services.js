"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const auth_datasource_1 = __importDefault(require("../auth/auth.datasource"));
const errors_1 = require("../../../../shared/errors/errors");
const upload_cloudinary_1 = __importDefault(require("../../../../shared/cloudinary/upload.cloudinary"));
const blog_entities_1 = __importDefault(require("../../../../database/entities/blog.entities"));
const blog_datasource_1 = __importDefault(require("./blog.datasource"));
let BlogServices = class BlogServices {
    constructor(authDatasource, blogDatasource) {
        this.authDatasource = authDatasource;
        this.blogDatasource = blogDatasource;
    }
    async createBlog(admin, data, file) {
        try {
            const { id } = admin;
            // console.log(file[0])
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed');
            const images = await (0, upload_cloudinary_1.default)(file);
            const newBlog = new blog_entities_1.default();
            newBlog.content = data.content;
            newBlog.title = data.title;
            newBlog.images = images;
            newBlog.createdBy = userExist;
            userExist.blogs?.push(newBlog);
            const createBlog = await this.blogDatasource.newBlog(userExist, newBlog);
            return createBlog;
        }
        catch (error) {
            throw error;
        }
    }
    async updateBlog(admin, data, file) {
        try {
            const { id } = admin;
            const { title, content } = data.data;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed');
            let findBlog = await this.blogDatasource.findBlog(data.id);
            if (!findBlog)
                throw new errors_1.NotFoundError('Blog does not exist.');
            const userBlogs = userExist.blogs;
            let userPermitted = userBlogs?.some((blog) => findBlog.createdBy?.id === userExist.id) ?? false;
            if (!userPermitted || userExist.role != 'SUPERADMIN')
                throw new errors_1.ForbiddenError('You do not have permission to do this');
            let images = [];
            if (file.length > 0) {
                images = await (0, upload_cloudinary_1.default)(file);
            }
            if (images.length > 0)
                findBlog.images = images;
            findBlog.title = title ? title : findBlog.title;
            findBlog.content = content ? content : findBlog.content;
            return await this.blogDatasource.saveUpdate(findBlog);
        }
        catch (error) {
            throw error;
        }
    }
    async getBlogById(id) {
        try {
            const findBlog = await this.blogDatasource.findBlog(id);
            if (!findBlog)
                throw new errors_1.NotFoundError('Blog not found.');
            return findBlog;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllBlogs(data) {
        try {
            const { page, limit } = data;
            return await this.blogDatasource.getAllBlogs(page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteBlog(id, admin) {
        try {
            const userExist = await this.authDatasource.findById(admin.id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed');
            const findBlog = await this.blogDatasource.findBlog(id);
            if (!findBlog)
                throw new errors_1.NotFoundError('Blog not found.');
            const userBlogs = userExist.blogs;
            let userPermitted = userBlogs?.some((blog) => blog.id === findBlog.id) ?? false;
            if (!userPermitted || userExist.role != 'SUPERADMIN')
                throw new errors_1.ForbiddenError('You do not have permission to do this.');
            const deleteBlog = await this.blogDatasource.deleteBlog(id, findBlog);
            return { deleteBlog };
        }
        catch (error) {
            throw error;
        }
    }
};
BlogServices = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(auth_datasource_1.default)),
    __param(1, (0, tsyringe_1.inject)(blog_datasource_1.default)),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_datasource_1.default !== "undefined" && auth_datasource_1.default) === "function" ? _a : Object, typeof (_b = typeof blog_datasource_1.default !== "undefined" && blog_datasource_1.default) === "function" ? _b : Object])
], BlogServices);
exports.default = BlogServices;
