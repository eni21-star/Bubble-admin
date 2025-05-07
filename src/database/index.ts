import { DataSource } from "typeorm";
import Admin from "./entities/admin.entities";
import appConfig from "../config/app.config";
import RefreshToken from "./entities/refresh-token.entities";
import Blog from "./entities/blog.entities";
import Images from "./entities/images.entities";
import Applicants from "./entities/applicants.entities";
import Files from "./entities/file.entities";
import Popup from "./entities/popup.entities";
import Subscribers from "./entities/subscribers.entities";
import Incidents from "./entities/incidents.entities";


const AppDataSource = new DataSource({
    type: 'postgres',
    host: appConfig.db.host,
    port: appConfig.db.port,
    username: appConfig.db.username,
    password: appConfig.db.password,
    database: 'postgres',
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [Admin, RefreshToken, Blog, Images, Applicants, Files, Popup, Subscribers, Incidents],
    migrations: [ process.env.NODE_ENV == 'staging' ? 'dist/database/migrations/*.js' : 'dist/database/migrations/*.js']
})

export default AppDataSource