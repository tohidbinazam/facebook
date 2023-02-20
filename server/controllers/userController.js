import User from '../models/userModel.js';
// import uploadImage from '../utility/uploadImage.js';
import { v2 as cloudinary } from 'cloudinary';

export const updateProfile = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const addFeatured = async (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const doc = req.files.file;
  const photos = [];

  try {
    doc.forEach((file) => {
      cloudinary.uploader
        .upload(file.tempFilePath, {
          folder: 'featured',
        })
        .then((result) => {
          photos.push(result.secure_url);
        });
    });

    // const photos = uploadImage(files, 'featured');
    const new_featured = { title, photos };
    const prev_featured = await User.findById(id).select('featured');

    const featured = [...prev_featured.featured, new_featured];

    const user = await User.findByIdAndUpdate(id, { featured }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
