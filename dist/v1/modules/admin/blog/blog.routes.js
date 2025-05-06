"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const blogRouter = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../../../../shared/middleware/auth.middleware");
const tsyringe_1 = require("tsyringe");
const blog_controllers_1 = __importDefault(require("./blog.controllers"));
const validation_middleware_1 = require("../../../../shared/middleware/validation.middleware");
const blog_dto_1 = require("./blog.dto");
const validate_id_params_middleware_1 = require("../../../../shared/middleware/validate-id-params.middleware");
const permissions_middleware_1 = __importDefault(require("../../../../shared/middleware/permissions.middleware"));
const blogController = tsyringe_1.container.resolve(blog_controllers_1.default);
exports.upload = (0, multer_1.default)({ dest: 'uploads/' });
blogRouter
    .post('/new-blog', [auth_middleware_1.authMiddleware, exports.upload.array('images'), (0, permissions_middleware_1.default)('create_blog'), (0, validation_middleware_1.reqValidator)(blog_dto_1.CreateBlogDto)], blogController.createBlog.bind(blogController))
    .put('/update-blog/:id', [auth_middleware_1.authMiddleware, exports.upload.array('images'), (0, permissions_middleware_1.default)('update_blog'), validate_id_params_middleware_1.validateIdParams, (0, validation_middleware_1.reqValidator)(blog_dto_1.UpdateeBlogDto)], blogController.updateBlog.bind(blogController))
    .get('/blog/:id', validate_id_params_middleware_1.validateIdParams, blogController.getBlogById.bind(blogController))
    .get('/blogs', blogController.getAllBlogs.bind(blogController))
    .delete('/blog/:id', [validate_id_params_middleware_1.validateIdParams, auth_middleware_1.authMiddleware, (0, permissions_middleware_1.default)('delete_blog')], blogController.deleteBlog.bind(blogController));
exports.default = blogRouter;
