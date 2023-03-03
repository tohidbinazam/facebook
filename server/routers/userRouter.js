import express from 'express';
import { addFeatured, updateProfile } from '../controllers/userController.js';
import multer from 'multer';
import uploadImage from '../middlewares/uploadImage.js';

// Router init
const router = express.Router();

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

// Multer init
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
router.post('/featured/:id', uploadImage, addFeatured);

// Export router
export default router;
