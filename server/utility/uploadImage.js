import { v2 as cloudinary } from 'cloudinary';

const uploadImage = (files, folder) => {
  const photos = [];
  files.forEach((file) => {
    cloudinary.uploader
      .upload(file.tempFilePath, {
        folder: folder,
      })
      .then((result) => {
        photos.push(result.secure_url);
      });
  });
  return photos;
};

export default uploadImage;
