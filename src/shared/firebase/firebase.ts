import admin from "firebase-admin";
const serviceAccount = JSON.parse(Buffer.from(appConfig.services.firebase_credentials_base64 as string, "base64").toString("utf8"))
import appConfig from "../../config/app.config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: appConfig.services.firebase_db_url ,
});

export const firebaseDB = admin.database();
