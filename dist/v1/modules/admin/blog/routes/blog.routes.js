"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const blogRouter = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../../../../../shared/middleware/auth.middleware");
const tsyringe_1 = require("tsyringe");
const blog_controllers_1 = __importDefault(require("../controllers/blog.controllers"));
const validation_middleware_1 = require("../../../../../shared/middleware/validation.middleware");
const blog_dto_1 = require("../dto/blog.dto");
const blongController = tsyringe_1.container.resolve(blog_controllers_1.default);
exports.upload = (0, multer_1.default)({ dest: 'uploads/' });
blogRouter
    .post('/new-blog', [auth_middleware_1.authMiddleware, exports.upload.array('images'), (0, validation_middleware_1.reqValidator)(blog_dto_1.CreateBlogDto)], blongController.createBlog.bind(blongController))
    .post('/update-blog');
exports.default = blogRouter;
