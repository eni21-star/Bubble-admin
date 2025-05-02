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
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const auth_datasource_1 = __importDefault(require("../../auth/datasource/auth.datasource"));
const errors_1 = require("../../../../../shared/errors/errors");
const upload_cloudinary_1 = __importDefault(require("../../../../../shared/cloudinary/upload.cloudinary"));
const blog_entities_1 = __importDefault(require("../../../../../database/entities/blog.entities"));
const blog_datasource_1 = __importDefault(require("../datasource/blog.datasource"));
let BlogServices = class BlogServices {
    constructor(authDatasource, blogDatasource) {
        this.authDatasource = authDatasource;
        this.blogDatasource = blogDatasource;
    }
    async createBlog(admin, data, file) {
        try {
            const { id } = admin;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed');
            const images = await (0, upload_cloudinary_1.default)(file);
            console.log(images);
            const newBlog = new blog_entities_1.default();
            newBlog.content = data.content;
            newBlog.title = data.title;
            newBlog.images = images;
            const createBlog = await this.blogDatasource.newBlog(userExist, newBlog);
            return createBlog;
        }
        catch (error) {
            throw error;
        }
    }
    async updateBlog(admin, data) {
        try {
            const { id } = admin;
            const { title, content } = data;
            const userExist = await this.authDatasource.findById(id);
            if (!userExist)
                throw new errors_1.NotFoundError('Please create an account to proceed');
            let findBlog = await this.blogDatasource.findBlog(data.id);
            if (!findBlog)
                throw new errors_1.NotFoundError('Blog does not exist.');
            // since it's an admin is there need authorizing who can edit blogs ?
            findBlog.title = title ? title : findBlog.title;
            findBlog.content = content ? content : findBlog.content;
            return await this.blogDatasource.saveUpdate(findBlog);
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
    __metadata("design:paramtypes", [auth_datasource_1.default,
        blog_datasource_1.default])
], BlogServices);
exports.default = BlogServices;
