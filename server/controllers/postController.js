import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/userModel.js';

export const createPost = async (req, res, next) => {
  const { text } = req.body;
  const { userId } = req.params;
  const images = req.photos;

  try {
    await Post.create({ text, images, userId });
    const post = await Post.find({ userId }).populate(
      'userId',
      'fs_name sur_name photo'
    );
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate(
      'userId',
      'fs_name sur_name photo'
    );
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const editPost = async (req, res, next) => {
  const postId = req.params.userId;
  const images = req.photos;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { images, ...req.body },
      { new: true }
    );
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.userId;

  try {
    await Post.findByIdAndDelete(postId);
    res.status(201).json('Post deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const myAllPost = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const post = await Post.find({ userId }).populate(
      'userId',
      'fs_name sur_name photo'
    );
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const allUserPost = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const post = await User.findById(userId).select('following friend_list');
    const following = post.following;
    const friend_list = post.friend_list;
    const allPost = await Post.find({
      userId: { $in: [...following, ...friend_list] },
    }).populate('userId', 'fs_name sur_name photo');
    res.status(200).json(allPost);
  } catch (error) {
    next(error);
  }
};

export const addLike = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.body.userId;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: { $each: [userId], $position: 0 } } },
      { new: true }
    ).populate('userId', 'fs_name sur_name photo');
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const removeLike = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.body.userId;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    ).populate('userId', 'fs_name sur_name photo');
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate('comments.user', 'fs_name sur_name photo')
      .select('comments');
    res.status(200).json(post.comments);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  try {
    // populate the comments user
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { user: userId, text } },
      },
      { new: true }
    )
      .populate('comments.user', 'fs_name sur_name photo')
      .select('comments');

    res.status(201).json(post.comments);
  } catch (error) {
    next(error);
  }
};

export const addCommentLike = async (req, res, next) => {
  const { postId } = req.params;
  const { commentId, userId } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          'comments.$[comment].likes': {
            $each: [userId],
            $position: 0,
          },
        },
      },
      {
        new: true,
        arrayFilters: [{ 'comment._id': commentId }],
      }
    )
      .populate('comments.user', 'fs_name sur_name photo')
      .select('comments');

    // const commentId = 'your-comment-id-here';
    // const userId = 'your-user-id-here';

    // Post.findOneAndUpdate(
    //   { 'comments._id': commentId },
    //   { $push: { 'comments.$.likes': { $each: [userId], $position: 0 } } },
    //   { new: true }
    // );
    res.status(200).json(post.comments);
  } catch (error) {
    next(error);
  }
};

export const removeCommentLike = async (req, res, next) => {
  const { postId } = req.params;
  const { commentId, userId } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          'comments.$[comment].likes': userId,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'comment._id': commentId }],
      }
    )
      .populate('comments.user', 'fs_name sur_name photo')
      .select('comments');
    res.status(200).json(post.comments);
  } catch (error) {
    next(error);
  }
};

export const postImages = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const latestPosts = await Post.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      { $limit: 12 },
      { $unwind: '$images' },
      { $group: { _id: null, images: { $push: '$images' } } },
      { $project: { _id: 0, images: { $slice: ['$images', 9] } } },
    ]);
    const allImages = latestPosts.length ? latestPosts[0].images : [];
    res.status(200).json(allImages);
  } catch (error) {
    next(error);
  }
};
