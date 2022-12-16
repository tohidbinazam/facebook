import express from "express";
import { userLogin, loggedInUser, verifyAccount, resentVerify, forgotPassword, resetPassword, userLogout, userRegEmail, userReEmail, verifyCode, findUser } from "../controllers/authController.js";


// Router init
const router = express.Router()

// user auth routers
router.post('/register/:auth', userRegEmail)
router.post('/resend/:auth', userReEmail)
router.post('/verify-code', verifyCode)
router.get('/me', loggedInUser)
router.post('/login', userLogin)
router.post('/find-user', findUser)
router.patch('/reset-password', resetPassword)



router.post('/logout', userLogout)

router.post('/verify', verifyAccount)
router.post('/resent-verify', resentVerify)
router.post('/forgot-password', forgotPassword)


// Export router
export default router;