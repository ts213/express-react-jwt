import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router as userRouter } from './routers/userRouter.js';
import errorMiddleware from './middlewares/error-middleware.js';

express()
  .use(express.json())
  .use(cookieParser())
  .use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }))
  .use('/api', userRouter)
  .use(errorMiddleware)

  .listen(process.env.PORT || 8000, function () {
    console.log(`Server started on PORT: ${this.address().port}`);
  });
