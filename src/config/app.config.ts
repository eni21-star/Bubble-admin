import { getEnv } from "./env.config";
import dotenv from 'dotenv'
dotenv.config()

const appConfig = {
    app: {
        name: process.env.APP_NAME,
        env: getEnv(),
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
        jwtSecret: process.env.JWT_SECRET as string,
        cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,        
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
        nodemailer_user: process.env.NODEMAILER_USER,
        nodemailer_password: process.env.NODEMAILER_PASSWORD,
        nodemailer_service: process.env.NODEMAILER_SERVICE,
        firebase_db_url: process.env.FIREBASE_DB_URL,
        firebase_credentials_base64: process.env.FIREBASE_CREDENTIALS_BASE64
    }
}

export default appConfig