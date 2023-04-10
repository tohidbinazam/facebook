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
  .patch(multer_upload, uploadImage, editPost)
  .delete(deletePost);
router.route('/all/:userId').get(allUserPost);
router.route('/like/:postId').post(addLike).patch(removeLike);
router
  .route('/comment/:postId')
  .get(getComment)
  .post(addComment)
  .patch(addCommentLike);
router.patch('/comment/like/:postId', removeCommentLike);
router.route('/photos/:userId').get(postImages);

export default router;
