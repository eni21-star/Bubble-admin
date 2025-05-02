"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const careers_controllers_1 = __importDefault(require("./careers.controllers"));
const blog_routes_1 = require("../blog/blog.routes");
const careerRoute = express_1.default.Router();
const careerController = tsyringe_1.container.resolve(careers_controllers_1.default);
careerRoute
    .post(`/careers/apply`, blog_routes_1.upload.single('file'), careerController.newApplicant.bind(careerController));
