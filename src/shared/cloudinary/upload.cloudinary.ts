import { BadreqError } from '../errors/errors';
import imageValidator from '../utils/image-validator.utils';
import cloudinary from './index'; // adjust path if different

async function uploadImage(file: Express.Multer.File[]) {
  try {

    const imageData = []

    for(let i=0; i< file.length; i++){
        console.log(file[i].path)
        const validateImage = await imageValidator(file[i])
        if(!validateImage.valid) throw new BadreqError(validateImage.reason as string)

        const result = await cloudinary.uploader.upload(file[i].path, {folder: 'fsl-admin', });
       
        const { secure_url, format, original_filename } = result
        imageData.push({ imageUrl: secure_url, imageFormat: format, original_filename }) 

    }

    return imageData

  } catch (error) {
    throw error;
  }
}

export default uploadImage