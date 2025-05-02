import { v2 as cloudinary } from 'cloudinary';
import appConfig from '../../config/app.config';

cloudinary.config({
  cloud_name: appConfig.services.cloudinary_cloud_name,  // your cloud name
  api_key: appConfig.services.cloudinary_api_key,        // your API key
  api_secret: appConfig.services.cloudinary_api_secret,  // your API secret
});

export default cloudinary;
