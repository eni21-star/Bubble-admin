import { BadreqError } from '../errors/errors';
import bufferToStream from '../utils/bufferToStream.utils';
import imageValidator from '../utils/image-validator.utils';
import cloudinary from './index'; 

async function uploadImage(file: Express.Multer.File[]) {
  try {

    const imageData = []

    for(let i=0; i< file.length; i++){

        const validateImage = await imageValidator(file[i])
        if(!validateImage.valid) throw new BadreqError(validateImage.reason as string)

        const stream = bufferToStream(file[i].buffer)
        const result: any = await new Promise((resolve, reject)=>{
            const uploadStream =  cloudinary.uploader.upload_stream( {folder: 'fsl-admin', public_id: file[i].originalname}, 
              (err, res)=>{
                if(err) reject(err)
                resolve(res)
              }
            );
            stream.pipe(uploadStream)
        })
        const { secure_url, format, original_filename } = result
        imageData.push({ imageUrl: secure_url, imageFormat: format, original_filename }) 

    }

    return imageData

  } catch (error) {
    throw error;
  }
}

export default uploadImage