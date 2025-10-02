// utils/multer.ts
import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Create Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // common folder for all uploads
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
    public_id: (req: Request, file: Express.Multer.File) => `${file.fieldname}_${Date.now()}`,
  } as any,
}) as multer.StorageEngine;

// File type filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ----------------------
// Export middleware for different entities
// ----------------------

// City - single image
export const uploadCityImage = upload.single('image');

// Flat - multiple images (max 10)
export const uploadFlatImages = upload.array('images', 10);

// Project - main image + gallery images
export const uploadProjectImages = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
]);

// Employee - single profile image
export const uploadEmployeeImage = upload.single('image');
