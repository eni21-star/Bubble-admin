"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const admin_entities_1 = __importDefault(require("./entities/admin.entities"));
const app_config_1 = __importDefault(require("../config/app.config"));
const refresh_token_entities_1 = __importDefault(require("./entities/refresh-token.entities"));
const blog_entities_1 = __importDefault(require("./entities/blog.entities"));
const images_entities_1 = __importDefault(require("./entities/images.entities"));
const applicants_entities_1 = __importDefault(require("./entities/applicants.entities"));
const file_entities_1 = __importDefault(require("./entities/file.entities"));
const popup_entities_1 = __importDefault(require("./entities/popup.entities"));
const subscribers_entities_1 = __importDefault(require("./entities/subscribers.entities"));
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: app_config_1.default.db.host,
    port: app_config_1.default.db.port,
    username: app_config_1.default.db.username,
    password: app_config_1.default.db.password,
    database: 'postgres',
    synchronize: false,
    dropSchema: false,
    logging: false,
    entities: [admin_entities_1.default, refresh_token_entities_1.default, blog_entities_1.default, images_entities_1.default, applicants_entities_1.default, file_entities_1.default, popup_entities_1.default, subscribers_entities_1.default],
    migrations: [process.env.NODE_ENV == 'staging' ? 'dist/database/migrations/*.js' : 'dist/database/migrations/*.js']
});
exports.default = AppDataSource;
