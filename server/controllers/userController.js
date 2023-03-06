import User from '../models/userModel.js';

export const updateProfile = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const { photo, cover_photo } = req.files;

  try {
    if (photo) {
      const profile_photo = photo[0].filename;
      data.photo = profile_photo;
    }
    if (cover_photo) {
      const cover = cover_photo[0].filename;
      data.cover_photo = cover;
    }

    // update user
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const addFeatured = async (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const photos = req.photos;

  try {
    const new_featured = { title, photos };
    // const prev_featured = await User.findById(id).select('featured');

    // const featured = [...prev_featured.featured, new_featured];

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { featured: new_featured } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
