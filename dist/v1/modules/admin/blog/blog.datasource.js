"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const database_1 = __importDefault(require("../../../../database"));
const blog_entities_1 = __importDefault(require("../../../../database/entities/blog.entities"));
const images_entities_1 = __importDefault(require("../../../../database/entities/images.entities"));
const blogRepo = database_1.default.getRepository(blog_entities_1.default);
const imageRepo = database_1.default.getRepository(images_entities_1.default);
let BlogDatasource = class BlogDatasource {
    async newBlog(admin, blog) {
        const { createdBy, ...rest } = await blogRepo.save(blog);
        return rest;
    }
    async findBlog(id) {
        return await blogRepo.findOne({ where: { id }, relations: ['images', 'createdBy'] });
    }
    async saveUpdate(blog) {
        return await blogRepo.save(blog);
    }
    async getAllBlogs(page, limit) {
        const [data, total] = await blogRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
        });
        return { data, total, page, lastPage: Math.ceil(total / limit) };
    }
    async deleteBlog(id, blog) {
        await imageRepo.delete({ blog });
        return await blogRepo.delete({ id });
    }
};
BlogDatasource = __decorate([
    (0, tsyringe_1.injectable)()
], BlogDatasource);
exports.default = BlogDatasource;
