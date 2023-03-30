import { Router } from 'express';
import {
  addComment,
  addCommentLike,
  addLike,
  allUserPost,
  createPost,
  deletePost,
  editPost,
  myAllPost,
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
router.route('/like/:postId').post(addLike);
router.route('/comment/:postId').post(addComment).patch(addCommentLike);

export default router;
