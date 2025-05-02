import { DataSource } from "typeorm";
import Admin from "./entities/admin.entities";
import appConfig from "../config/app.config";
import RefreshToken from "./entities/refresh-token.entities";
import Blog from "./entities/blog.entities";
import Images from "./entities/images.entities";
import Applicants from "./entities/applicants.entities";
import Files from "./entities/file.entities";
import Popup from "./entities/popup.entities";


const AppDataSource = new DataSource({
    type: 'postgres',
    host: appConfig.db.host,
    port: appConfig.db.port,
    username: appConfig.db.username,
    password: appConfig.db.password,
    database: 'postgres',
    synchronize: false,
    dropSchema: false,
    logging: false,
    entities: [Admin, RefreshToken, Blog, Images, Applicants, Files, Popup],
    migrations: ['src/database/migrations/*.ts']
})

export default AppDataSource