import User from '../models/userModel.js';
import mongoose from 'mongoose';

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

export const findFriend = async (req, res, next) => {
  // Get ids with Array
  const { excludedIds } = req.body;

  // example
  // const ids = ['63ab1f73e6710db2c607cb47', '63bda619c88e1fe7b272332e'];

  try {
    const find_friend = await User.find()
      .where('_id')
      .nin(excludedIds)
      .select('fs_name sur_name photo');
    res.status(200).json(find_friend);
  } catch (error) {
    next(error);
  }
};

export const profileFriend = async (req, res, next) => {
  const id = req.params.id;

  try {
    // find a user by id and populate the followers array and select only fs_name and photo
    const friends = await User.findById(id)
      .populate(
        'follower following friend_list',
        'fs_name sur_name photo',
        null,
        {
          limit: 8,
        }
      )
      .select('isVerified');
    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
};
export const friendRequest = async (req, res, next) => {
  const id = req.params.id;

  try {
    // find a user by id and populate the followers array and select only fs_name and photo
    const request = await User.findById(id)
      .populate({
        path: 'follower',
        select: 'fs_name sur_name photo',
        options: { limit: 8 },
      })
      .select('isVerified');
    res.status(200).json(request.follower);
  } catch (error) {
    next(error);
  }
};

export const addFriend = async (req, res, next) => {
  const sender_id = req.params.id;
  const receiver_id = req.body.id;

  try {
    const sender = await User.findByIdAndUpdate(
      sender_id,
      { $push: { following: { $each: [receiver_id], $position: 0 } } },
      { new: true }
    );
    res.status(200).json(sender);
    await User.findByIdAndUpdate(receiver_id, {
      $push: { follower: { $each: [sender_id], $position: 0 } },
    });
  } catch (error) {
    next(error);
  }
};
