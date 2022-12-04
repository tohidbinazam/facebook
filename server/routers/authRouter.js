import express from "express";
import { userLogin, loggedInUser, verifyAccount, resentVerify, forgotPassword, resetPassword, userLogout, userRegEmail, userRegNumber, userReEmail } from "../controllers/authController.js";


// Router init
const router = express.Router()

// user auth routers
router.post('/register-email', userRegEmail)
router.post('/register-number', userRegNumber)
router.post('/resend-email', userReEmail)
router.post('/resend-number', userRegNumber)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/me', loggedInUser)
router.post('/verify', verifyAccount)
router.post('/resent-verify', resentVerify)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password', resetPassword)

// Export router
export default router;