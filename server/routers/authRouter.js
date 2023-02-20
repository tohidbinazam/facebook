import express from 'express';
import {
  login,
  resetPassword,
  userLogout,
  verifyCode,
  findUser,
  register,
  resendCode,
  isLoggedIn,
} from '../controllers/authController.js';

// Router init
const router = express.Router();

// user auth routers
router.post('/register/:auth', register);
router.post('/resend/:auth', resendCode);
router.post('/verify-code', verifyCode);
router.get('/me', isLoggedIn);
router.post('/login', login);
router.post('/find-user', findUser);
router.patch('/reset-password', resetPassword);
router.delete('/logout', userLogout);

// router.post('/verify', verifyAccount)
// router.post('/resent-verify', resentVerify)
// router.post('/forgot-password', forgotPassword)

// Router REST API
// router.route('/').get(getAllUsers);
// router.route('/:username').get(authMiddleware, getSingleUser);

// Export router
export default router;
