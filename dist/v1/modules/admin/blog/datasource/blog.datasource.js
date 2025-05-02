"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../../../database"));
const blog_entities_1 = __importDefault(require("../../../../../database/entities/blog.entities"));
const blogRepo = database_1.default.getRepository(blog_entities_1.default);
class BlogDatasource {
    async newBlog(admin, blog) {
        return await blogRepo.save(blog);
    }
    async findBlog(id) {
        return await blogRepo.findOne({ where: { id } });
    }
    async saveUpdate(blog) {
        return await blogRepo.save(blog);
    }
}
exports.default = BlogDatasource;
