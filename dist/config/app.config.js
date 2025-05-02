"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("./env.config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appConfig = {
    app: {
        name: process.env.APP_NAME,
        env: (0, env_config_1.getEnv)(),
    },
    server: {
        port: Number(process.env.PORT) || 3000
    },
    db: {
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        port: Number(process.env.DATABASE_PORT),
    },
    services: {
        jwtSecret: process.env.JWT_SECRET,
        cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
        nodemailer_user: process.env.NODEMAILER_USER,
        nodemailer_password: process.env.NODEMAILER_PASSWORD,
        nodemailer_service: process.env.NODEMAILER_SERVICE
    }
};
exports.default = appConfig;
