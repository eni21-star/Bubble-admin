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
const response_utils_1 = require("../../../../shared/utils/response.utils");
const blog_services_1 = __importDefault(require("../services/blog.services"));
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async createBlog(req, res, next) {
        try {
            const file = req.files;
            const data = req.body;
            const admin = req.admin;
            const response = await this.blogService.createBlog(admin, data, file);
            return res.status(201).json((0, response_utils_1.SuccessResponse)('Successfully created Blog', response));
        }
        catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next) {
        try {
            const data = req.body;
            const file = req.files ? req.files : null;
            const id = req.params.id;
            const admin = req.admin;
            const response = await this.blogService.updateBlog(admin, { data, id }, file);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Blog Updated.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async getBlogById(req, res, next) {
        try {
            const id = req.params.id;
            const response = await this.blogService.getBlogById(id);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Fetched Blog Successfully.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async getAllBlogs(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const response = await this.blogService.getAllBlogs({ page, limit });
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Fetched Blog Successfully.', response));
        }
        catch (error) {
            next(error);
        }
    }
    async deleteBlog(req, res, next) {
        try {
            const { id } = req.params;
            const admin = req.admin;
            const response = await this.blogService.deleteBlog(id, admin);
            return res.status(200).json((0, response_utils_1.SuccessResponse)('Blog deleted successfully.', response));
        }
        catch (error) {
            next(error);
        }
    }
};
BlogController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(blog_services_1.default)),
    __metadata("design:paramtypes", [blog_services_1.default])
], BlogController);
exports.default = BlogController;
