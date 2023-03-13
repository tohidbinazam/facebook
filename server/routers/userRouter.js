import express from 'express';
import {
  addFeatured,
  addFriend,
  confirmFriend,
  findFriend,
  friendRequest,
  profileFriend,
  removeFriend,
  updateProfile,
} from '../controllers/userController.js';
import multer from 'multer';
import { multer_upload, uploadImage } from '../middlewares/uploadImage.js';

// Router init
const router = express.Router();

// For Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == 'photo') {
      cb(null, 'server/public/profile_photos');
    } else if (file.fieldname == 'cover_photo') {
      cb(null, 'server/public/cover_photos');
    }
  },
  filename: (req, file, cb) => {
    const prefix = Date.now();
    cb(null, prefix + '_' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadFiles = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'cover_photo', maxCount: 1 },
]);

// Import controllers
router.patch('/:id', uploadFiles, updateProfile);
router.post('/featured/:id', multer_upload, uploadImage, addFeatured);
router.post('/find-friend', findFriend);
router.get('/friend-request/:id', friendRequest);

router
  .route('/friend/:id')
  .get(profileFriend)
  .patch(addFriend)
  .post(confirmFriend);
router.post('/remove-friend/:id', removeFriend);

// Export router
export default router;
