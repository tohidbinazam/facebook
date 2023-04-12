import { Router } from 'express';
import {
  addComment,
  addCommentLike,
  addLike,
  allUserPost,
  createPost,
  deletePost,
  editPost,
  getComment,
  getSinglePost,
  myAllPost,
  postImages,
  removeCommentLike,
  removeLike,
} from '../controllers/postController.js';
import { multer_upload, uploadImage } from '../middlewares/uploadImage.js';

const router = Router();

router
  .route('/:userId')
  .post(multer_upload, uploadImage, createPost)
  .get(myAllPost)
  .patch(multer_upload, uploadImage, editPost);

router.route('/single/:postId').get(getSinglePost).delete(deletePost);
router.route('/all/:userId').get(allUserPost);
router.route('/like/:postId').post(addLike).patch(removeLike);

router.route('/comment/:postId').get(getComment).post(addComment);

router
  .route('/comment/like/:postId')
  .post(addCommentLike)
  .patch(removeCommentLike);

router.route('/photos/:userId').get(postImages);

export default router;
