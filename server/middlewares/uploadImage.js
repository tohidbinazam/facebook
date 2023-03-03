import { v2 as cloudinary } from 'cloudinary';

const uploadImage = async (req, res, next) => {
  const files = req.files.file;
  const photos = [];

  files.forEach(async (file) => {
    await cloudinary.uploader
      .upload(file.tempFilePath, {
        folder: 'featured',
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

export default uploadImage;
