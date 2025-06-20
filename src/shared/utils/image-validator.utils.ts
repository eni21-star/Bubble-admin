import sharp from 'sharp';

async function imageValidator(file: Express.Multer.File): Promise<{ valid: boolean; reason?: string }> {

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return { valid: false, reason: 'Invalid file type' };
  }
  
  if (file.size > maxSizeInBytes) {
    return { valid: false, reason: 'File too large' };
  }
  
  try {
    // const metadata = await sharp(file.buffer).metadata();
    // if (metadata.width! < 300 || metadata.height! < 300) {
    //   return { valid: false, reason: 'Image too small' };
    // }
  } catch (error) {
    return { valid: false, reason: 'Invalid or corrupted image' };
  }
  
  return { valid: true };
}

export default imageValidator