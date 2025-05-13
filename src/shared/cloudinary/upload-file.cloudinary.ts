import { error } from 'console';
import { BadreqError } from '../errors/errors';
import bufferToStream from '../utils/bufferToStream.utils';
import imageValidator from '../utils/image-validator.utils';
import cloudinary from './index'; 

async function uploadFile(file: Express.Multer.File[]) {
  try {

    const imageData = []

    for(let i=0; i< file.length; i++){
        const stream = bufferToStream(file[i].buffer)
        const result: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'fsl-admin',
                resource_type: 'raw',
                public_id: file[i].originalname,
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
      
            stream.pipe(uploadStream);
          });
      
          imageData.push({ fileUrl: result.secure_url });

    }

    return imageData

  } catch (error) {
    throw error;
  }
}

export default uploadFile