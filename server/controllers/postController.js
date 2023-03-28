import Post from '../models/Post.js';
import User from '../models/userModel.js';

export const createPost = async (req, res, next) => {
  const { text } = req.body;
  const { userId } = req.params;
  const images = req.photos;

  try {
    const post = await Post.create({ text, images, userId });
    res.status(201).json(post);
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
    const post = await Post.find({ userId });
    res.status(201).json(post);
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
    res.status(201).json(allPost);
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
    );
    res.status(201).json(post);
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
        $push: {
          comments: {
            $each: [{ user: userId, text }],
            $position: 0,
          },
        },
      },
      { new: true }
    ).populate('comments.user', 'fs_name sur_name photo');

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};