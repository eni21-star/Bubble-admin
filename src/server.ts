import bootstrap from "./bootstrap";
import { logger } from "./shared/utils/logger/logger";
import http from 'http'
import app from "./app";
import appConfig from "./config/app.config";
const server = http.createServer(app)
const port = appConfig.server.port





const startServer = async ()=>{
   await bootstrap()
   server.listen(port, '0.0.0.0', ()=>{
    logger.info(`${appConfig.app.name} is running on port ${port} in environment ${appConfig.app.env} `)
   })

}


process
  .on('uncaughtException', (err) => {
    logger.error({ err });
    console.log(err);
    process.exit(1);
  })
  .on('SIGINT', () => {
    process.exit(0);
  });


startServer()