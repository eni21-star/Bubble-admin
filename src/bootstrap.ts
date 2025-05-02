import AppDataSource from "./database"
import { logger } from "./shared/utils/logger/logger"



const bootstrap = async ()=>{

    try {
       await AppDataSource.initialize()
       logger.info('Database running successfully..')
    } catch (error: any) {
        logger.error(error.message)
    }
}

export default bootstrap

