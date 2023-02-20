import express from 'express';
import { addFeatured, updateProfile } from '../controllers/userController.js';

// Router init
const router = express.Router();

// Import controllers
router.patch('/:id', updateProfile);
router.post('/featured/:id', addFeatured);

// Export router
export default router;
