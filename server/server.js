import express from 'express'
import dotenv from 'dotenv'
import mongoDBConnect from './config/db.js';
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import verifyToken from './controllers/verifyToken.js';

dotenv.config()
const port = process.env.PORT || 5080

// Express init
const app = express()

// Body init
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(express.static('server/public'))

// cookie parser init
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)

// User router
app.use('/api/v1/user', userRouter)


// Token verify
app.post('/api/v1/verify-token', verifyToken)

// Express error handler
app.use(errorHandler)

app.listen(port, () => {
    mongoDBConnect()
    console.log(`SERVER RUNNING ON PORT: ${port}`);
})