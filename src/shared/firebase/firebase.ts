import admin from "firebase-admin";
import * as serviceAccount from '../../config/firebase-sdk.json'// download from Firebase Console
import appConfig from "../../config/app.config";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: appConfig.services.firebase_db_url ,
});

export const firebaseDB = admin.database();
