import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import DatauriParser from 'datauri/parser.js';
import path from 'path';

// dataUri Config
const parser = new DatauriParser();

// For Multer memory storage
const storage = multer.memoryStorage();
export const multer_upload = multer({ storage }).array('file');

const dataUri = (file) => {
  const extname = path.extname(file.originalname).toString();
  return parser.format(extname, file.buffer).content;
};

export const uploadImage = async (req, res, next) => {
  const files = req.files;
  const folder = req.body.folder;
  const photos = [];

  files.forEach(async (file) => {
    const file64 = dataUri(file);

    await cloudinary.uploader
      .upload(file64, {
        folder,
      })
      .then((result) => {
        photos.push(result.secure_url);
      });

    // Check for all files uploaded
    if (photos.length == files.length) {
      req.photos = photos;
      next();
    }
  });
};
